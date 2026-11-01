export const getHealth = (_req, res) => {
  res.status(200).json({
    ok: true,
    message: 'API de inventario y ventas funcionando'
  });
};
