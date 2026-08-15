import { NextResponse } from 'next/server';

export function makeRouteHandler(controller, middlewares = []) {
  return async (req, { params } = {}) => {
    const url = new URL(req.url);
    const query = Object.fromEntries(url.searchParams.entries());
    
    let body = {};
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      try {
        body = await req.clone().json();
      } catch (err) {
        // Empty or non-JSON body
      }
    }
    
    const expressParams = {};
    if (params) {
      const resolvedParams = await Promise.resolve(params);
      Object.assign(expressParams, resolvedParams);
    }
    
    const expressReq = {
      method: req.method,
      url: req.url,
      query,
      body,
      params: expressParams,
      headers: Object.fromEntries(req.headers.entries()),
    };
    
    let resolvedResponse = null;
    let ended = false;
    
    const expressRes = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        if (ended) return this;
        resolvedResponse = NextResponse.json(data, { status: this.statusCode || 200 });
        ended = true;
        return this;
      },
      send(data) {
        if (ended) return this;
        resolvedResponse = new Response(data, { status: this.statusCode || 200 });
        ended = true;
        return this;
      },
      statusCode: 200,
    };
    
    try {
      const runRunner = async () => {
        for (const middleware of middlewares) {
          if (ended) break;
          await new Promise((resolve, reject) => {
            middleware(expressReq, expressRes, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
        }
        
        if (!ended) {
          await controller(expressReq, expressRes, (err) => {
            if (err) throw err;
          });
        }
      };
      
      await runRunner();
      
      if (resolvedResponse) {
        return resolvedResponse;
      }
      
      return NextResponse.json({ success: false, message: "No response returned from controller" }, { status: 500 });
    } catch (error) {
      console.error("API Route Error:", error);
      const statusCode = error.statusCode || 500;
      return NextResponse.json({ 
        success: false, 
        message: error.message || "Internal Server Error" 
      }, { status: statusCode });
    }
  };
}
