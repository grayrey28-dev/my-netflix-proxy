const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  // Replace the URL below with the site you want to unblock
  const target = "https://www.remoteplay.dl.playstation.net&deviceid=PHYS-SMIC-US-0000-3565&user=grreyes&rule=U3R1ZGVudCBEZWZhdWx0IFBvbGljeSAtIEJsb2Nr&ruleid=3f767f59-8bfc-4b13-a842-a3f03009ab4e&path=remoteplay/lang/en/index.html&method=rule_match&cid=Z3JyZXllczE3NTU4Nzg4MjYxNDY="; 

  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { '^/api': '' }, // Cleans the URL path
    onProxyRes: (proxyRes) => {
      // Deletes security headers that prevent "framing" or "mirroring"
      delete proxyRes.headers['content-security-policy'];
      delete proxyRes.headers['x-frame-options'];
    }
  });

  return proxy(req, res);
};
