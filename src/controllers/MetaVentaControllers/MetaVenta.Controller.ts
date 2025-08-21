// Extiende la interfaz Request para incluir la propiedad 'usuario'
declare module 'express-serve-static-core' {
  interface Request {
    usuario?: any;
  }
}
import { metaVenta } from '../../models/MetaVentaModels/MetaVenta';
// import eliminado: ventasMensuales
import { Request, Response } from 'express';

export const registrarMetaVenta = async (req: Request, res: Response) => {
  try {
    const { usuarioId: bodyUsuarioId, pais, anio, metaAnual } = req.body;
    const usuarioId = req.usuario?.id || bodyUsuarioId;
    if (!usuarioId || !pais || !anio || !metaAnual) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    // Only allow users with role 'Empleado' to set metas for themselves
    if (req.usuario && req.usuario.rol && req.usuario.rol !== 'Empleado') {
      return res.status(403).json({ error: 'No autorizado para establecer metas.' });
    }

    const metaMensual = Number(metaAnual) / 12;

    // Upsert: try to find existing row by unique keys, update if exists, otherwise create
    const existing = await metaVenta.findOne({ where: { usuarioId, pais, anio } });
    if (existing) {
      await existing.update({ metaAnual, metaMensual });
      return res.status(200).json(existing);
    }

    const meta = await metaVenta.create({ usuarioId, pais, anio, metaAnual, metaMensual });
    res.status(201).json(meta);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar meta de venta.' });
  }
};

export const consultarMetasPorUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.usuario?.id || req.params.usuarioId;
    const { pais, anio } = req.query;
    const where: any = { usuarioId };
    if (anio) where.anio = anio;
    // Si pais no está presente, no se filtra por país
    if (pais) {
      where.pais = pais;
    }
    const metas = await metaVenta.findAll({ where });
    res.json(metas);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar metas.' });
  }
};

export const rendimientoVentas = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.usuario?.id || req.query.usuarioId;
    const { pais, anio } = req.query;
    const whereMeta: any = { usuarioId };
    if (pais) whereMeta.pais = pais;
    if (anio) whereMeta.anio = anio;
    const metas = await metaVenta.findAll({ where: whereMeta });
    const resultados = [];
    for (const meta of metas) {
      // Aquí se eliminó la lógica que dependía de ventasMensuales
      resultados.push({
        usuarioId: meta.get('usuarioId'),
        pais: meta.get('pais'),
        anio: meta.get('anio'),
        metaAnual: meta.get('metaAnual'),
        metaMensual: meta.get('metaMensual'),
        mensual: [],
        acumuladoReal: 0,
        acumuladoProyectado: 0,
        porcentajeCumplimientoAcumulado: 0,
      });
    }
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular rendimiento de ventas.' });
  }
};
