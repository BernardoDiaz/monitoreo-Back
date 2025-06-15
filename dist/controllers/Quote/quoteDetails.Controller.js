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
exports.updateQuoteDetails = exports.deleteQuoteDetails = exports.getQuoteDetails = void 0;
const quoteDetails_1 = require("../../models/Quote/quoteDetails");
const getQuoteDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quoteId } = req.params;
        if (!quoteId) {
            return res.status(400).json({ message: "Falta el ID de la cotizacion" });
        }
        const quotes = yield quoteDetails_1.quoteDetails.findAll({
            attributes: ['id', 'product', 'quantity', 'price', 'subtotal'],
            where: { quoteId: quoteId },
        });
        return res.status(200).json(quotes);
    }
    catch (error) {
        console.error("Error al obtener:", error);
        return res.status(500).json({ message: "Error al obtener las notas" });
    }
});
exports.getQuoteDetails = getQuoteDetails;
const deleteQuoteDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Falta el ID" });
        }
        const Delete = yield quoteDetails_1.quoteDetails.findByPk(id);
        if (!Delete) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        yield Delete.destroy();
        return res.status(200).json({ message: "Eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar la nota:", error);
        return res.status(500).json({ message: "Error al eliminar" });
    }
});
exports.deleteQuoteDetails = deleteQuoteDetails;
const updateQuoteDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { companyId, quoteId, product, quantity, price, subtotal } = req.body;
        if (!companyId || !quoteId || !product || !quantity || !price || !subtotal) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const Update = yield quoteDetails_1.quoteDetails.findByPk(id);
        if (!Update) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        Update.set({ companyId, quoteId, product, quantity, price, subtotal });
        yield Update.save();
        return res.status(200).json(Update);
    }
    catch (error) {
        console.error("Error al actualizar la nota:", error);
        return res.status(500).json({ message: "Error al actualizar la nota" });
    }
});
exports.updateQuoteDetails = updateQuoteDetails;
