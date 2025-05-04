const expressStatusMonitor = require('express-status-monitor');
const prometheus = require('prom-client');

// Métricas personalizadas
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500]
});

// Middleware para recopilar métricas
const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.path, res.statusCode)
      .observe(duration);
  });
  
  next();
};

// Endpoint para métricas
const metricsEndpoint = async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
};

const setupMonitoring = (app) => {
  app.use(expressStatusMonitor());
  app.use(metricsMiddleware);
  app.get('/metrics', metricsEndpoint);
};

module.exports = setupMonitoring;