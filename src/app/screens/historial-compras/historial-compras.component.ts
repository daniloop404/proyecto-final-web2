import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/services/factura.service';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {
  userKey: string | null;
  facturas: any[] = [];

  constructor(private facturaService: FacturaService) {
    this.userKey = this.getUserKey();
  }

  ngOnInit() {
    if (this.userKey) {
      this.facturaService.getFacturas(this.userKey).subscribe((data: Record<string, any>) => {
        if (data) {
          this.facturas = Object.entries(data).map(([key, value]) => ({ key, ...value }));
        }
      });
    }
  }

  getUserKey(): string | null {
    // Get user key from sessionStorage
    return sessionStorage.getItem('userKey');
  }

  downloadPdf(factura: any) {
    const pdf = new jsPDF();
  
    // Add CELUQUITO centered
    pdf.text('CELUQUITO', 105, 10, { align: 'center' });
  
    // Add Factura centered
    pdf.text('Factura', 105, 20, { align: 'center' });
  
    // Add a line separator
    pdf.line(20, 30, 190, 30);
  
    // Add details from the factura object
    pdf.text(`Fecha: ${factura.fecha}`, 20, 40);
    pdf.text(`Nombre: ${factura.usuario.nombre}`, 20, 50);
    pdf.text(`Correo: ${factura.usuario.correo}`, 20, 60);
    pdf.text(`Dirección: ${factura.usuario.direccion}`, 20, 70);
    pdf.text(`Teléfono: ${factura.usuario.telefono}`, 20, 80);
  
    // Add a line separator
    pdf.line(20, 90, 190, 90);
  
    // Add items from the carrito array in a table
    const headers = ['Producto', 'Precio', 'Unidades', 'Subtotal'];
    let yPosition = 100;
  
    pdf.text(headers[0], 20, yPosition);
    pdf.text(headers[1], 80, yPosition);
    pdf.text(headers[2], 120, yPosition);
    pdf.text(headers[3], 160, yPosition);
  
    yPosition += 10;
  
    factura.carrito.forEach((item: any) => {
      pdf.text(`${item.info.marca} ${item.info.modelo}`, 20, yPosition);
      pdf.text(`$${item.info.precio.toFixed(2)}`, 80, yPosition);
      pdf.text(`${item.unidades}`, 120, yPosition);
      pdf.text(`$${item.subtotal.toFixed(2)}`, 160, yPosition);
  
      yPosition += 10;
    });
  
    // Add a line separator
    pdf.line(20, yPosition, 190, yPosition);
  
    // Calculate total without taxes (subtract 12%)
    const totalSinImpuestos = factura.total / 1.12;
  
    // Add total with and without taxes
    pdf.text(`Total sin impuestos: $${totalSinImpuestos.toFixed(2)}`, 120, yPosition + 10);
    pdf.text(`Total: $${factura.total.toFixed(2)}`, 160, yPosition + 20);
  
    // Save the PDF
    pdf.save('factura.pdf');
  }
}
