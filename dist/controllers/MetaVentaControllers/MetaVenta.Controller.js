"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rendimientoVentas = exports.consultarMetasPorUsuario = exports.registrarMetaVenta = void 0;
const MetaVenta_1 = require("../../models/MetaVentaModels/MetaVenta");
const registrarMetaVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { usuarioId: bodyUsuarioId, pais, anio, metaAnual } = req.body;
        const usuarioId = ((_a = req.usuario) === null || _a === void 0 ? void 0 : _a.id) || bodyUsuarioId;
        if (!usuarioId || !pais || !anio || !metaAnual) {
            return res.status(400).json({ error: 'Faltan datos requeridos.' });
        }
        // Only allow users with role 'Empleado' to set metas for themselves
        if (req.usuario && req.usuario.rol && req.usuario.rol !== 'Empleado') {
            return res.status(403).json({ error: 'No autorizado para establecer metas.' });
        }
        const metaMensual = Number(metaAnual) / 12;
        // Upsert: try to find existing row by unique keys, update if exists, otherwise create
        const existing = yield MetaVenta_1.metaVenta.findOne({ where: { usuarioId, pais, anio } });
        if (existing) {
            yield existing.update({ metaAnual, metaMensual });
            return res.status(200).json(existing);
        }
        const meta = yield MetaVenta_1.metaVenta.create({ usuarioId, pais, anio, metaAnual, metaMensual });
        res.status(201).json(meta);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al registrar meta de venta.' });
    }
});
exports.registrarMetaVenta = registrarMetaVenta;
const consultarMetasPorUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const usuarioId = ((_b = req.usuario) === null || _b === void 0 ? void 0 : _b.id) || req.params.usuarioId;
        const { pais, anio } = req.query;
        const where = { usuarioId };
        if (anio)
            where.anio = anio;
        // Si pais no está presente, no se filtra por país
        if (pais) {
            where.pais = pais;
        }
        const metas = yield MetaVenta_1.metaVenta.findAll({ where });
        res.json(metas);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al consultar metas.' });
    }
});
exports.consultarMetasPorUsuario = consultarMetasPorUsuario;
const rendimientoVentas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const usuarioId = ((_c = req.usuario) === null || _c === void 0 ? void 0 : _c.id) || req.query.usuarioId;
        const { pais, anio } = req.query;
        const whereMeta = { usuarioId };
        if (pais)
            whereMeta.pais = pais;
        if (anio)
            whereMeta.anio = anio;
        const metas = yield MetaVenta_1.metaVenta.findAll({ where: whereMeta });
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
    }
    catch (error) {
        res.status(500).json({ error: 'Error al calcular rendimiento de ventas.' });
    }
});
exports.rendimientoVentas = rendimientoVentas;
