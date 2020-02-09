const handler = async function(ctx, next){
    const body = ctx.request.body.body || {};
    const extra = ctx.request.body.extra || {};
    const secure = ctx.request.body.secure || {};

    await next();
};

module.exports = handler;