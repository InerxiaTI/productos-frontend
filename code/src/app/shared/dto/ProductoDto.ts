export class ProductoDto {
    id: number;
    nombre: string;
    descripcion: string;
    precio_compra: number;
    precio_venta: number;
    iva: number;
    marca: string;
    fecha_compra: Date;
    foto: string;
    idProveedor_fk: number;
}