import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Zoho styling parameters implementation
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#333333',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 15,
    marginBottom: 15,
  },
  companyDetails: {
    flexDirection: 'column',
    gap: 2,
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  invoiceTitleSection: {
    textAlign: 'right',
    justifyContent: 'center',
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    letterSpacing: 0.5,
  },
  
  metaGrid: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metaColumn: {
    width: '50%',
    flexDirection: 'column',
    gap: 4,
  },
  metaText: {
    fontSize: 9,
    color: '#475569',
  },
  boldLabel: {
    fontWeight: 'bold',
    color: '#0F172A',
  },
  
  billingGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 15,
  },
  billToBox: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  shipToBox: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  blockHeader: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    color: '#334155',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  blockBody: {
    padding: 8,
    flexDirection: 'column',
    gap: 3,
  },
  
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    minHeight: 24,
    alignItems: 'center',
  },
  tableHeaderRow: {
    backgroundColor: '#F1F5F9',
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    fontWeight: 'bold',
  },
  
  // Table Columns Sizing
  colNo: { width: '5%', textAlign: 'center' },
  colDesc: { width: '40%', paddingLeft: 6 },
  colQty: { width: '10%', textAlign: 'center' },
  colRate: { width: '12%', textAlign: 'right', paddingRight: 6 },
  colDisc: { width: '10%', textAlign: 'center' },
  colTax: { width: '11%', textAlign: 'center' },
  colAmt: { width: '12%', textAlign: 'right', paddingRight: 6 },
  
  thText: {
    fontWeight: 'bold',
    color: '#475569',
    fontSize: 8.5,
  },
  
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  notesSection: {
    width: '55%',
    flexDirection: 'column',
    gap: 8,
  },
  notesCard: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notesHeading: {
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 3,
  },
  
  calculationSection: {
    width: '40%',
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 8,
    flexDirection: 'column',
    gap: 5,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 1,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#CBD5E1',
    paddingTop: 6,
    marginTop: 4,
  },
  grandTotalText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E3A8A',
  }
});

const PDFTemplate = ({ invoiceData }) => {
  // Safe default mockup structured fields fallback configuration
  const data = invoiceData || {
    customerName: 'Walking Customer',
    location: 'Corporate',
    invoiceNumber: 'RAJ/INV-000000',
    orderNumber: 'ORD-000',
    invoiceDate: '18/05/2026',
    terms: 'Net 7',
    dueDate: '25/05/2026',
    customerNotes: 'Thank you for the payment.',
    termsConditions: 'Terms and conditions go here...',
    shippingCharges: 0,
    tdsTcsOption: 'TDS',
    taxSelect: 'Select a Tax',
    subTotal: 0,
    total: 0,
    items: [
      { itemDetails: 'Sample Testing Product Metric', quantity: 1, rate: 0, discount: 0, tax: 'Select Tax', amount: 0 }
    ]
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Company Branding Node */}
        <View style={styles.headerContainer}>
          <View style={styles.companyDetails}>
            <Text style={styles.companyName}>Suits Workspaces Private Limited</Text>
            <Text style={{ color: '#64748B' }}>Bidhan Nagar North, Twenty Four Pargana West Bengal</Text>
            <Text style={{ color: '#64748B' }}>Kolkata, West Bengal - 700091 | India</Text>
            <Text style={{ marginTop: 2, fontWeight: 'bold' }}>GSTIN: 19AAYCS9017N1Z7</Text>
          </View>
          <View style={styles.invoiceTitleSection}>
            <Text style={styles.invoiceTitle}>TAX INVOICE</Text>
          </View>
        </View>

        {/* Core Metadata Block Grid */}
        <View style={styles.metaGrid}>
          <View style={styles.metaColumn}>
            <Text style={styles.metaText}>
              <Text style={styles.boldLabel}>Invoice No: </Text>{data.invoiceNumber}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.boldLabel}>Invoice Date: </Text>{data.invoiceDate}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.boldLabel}>Terms: </Text>{data.terms}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.boldLabel}>Due Date: </Text>{data.dueDate}
            </Text>
          </View>
          <View style={styles.metaColumn}>
            <Text style={styles.metaText}>
              <Text style={styles.boldLabel}>Place Of Supply: </Text>{data.location || 'Corporate'}
            </Text>
            <Text style={styles.metaText}>
              <Text style={styles.boldLabel}>Order Number: </Text>{data.orderNumber || 'N/A'}
            </Text>
          </View>
        </View>

        {/* Client Ledger Identity Billing Grid */}
        <View style={styles.billingGrid}>
          <View style={styles.billToBox}>
            <Text style={styles.blockHeader}>Bill To</Text>
            <View style={styles.blockBody}>
              <Text style={{ fontWeight: 'bold', color: '#0F172A' }}>{data.customerName}</Text>
              <Text style={{ color: '#475569' }}>Registered Business Address Profile</Text>
              <Text style={{ color: '#475569', fontSize: 8.5 }}>Location Status: {data.location}</Text>
            </View>
          </View>
          <View style={styles.shipToBox}>
            <Text style={styles.blockHeader}>Ship To</Text>
            <View style={styles.blockBody}>
              <Text style={{ fontWeight: 'bold', color: '#0F172A' }}>{data.customerName}</Text>
              <Text style={{ color: '#475569' }}>Same as Billing Location Node</Text>
            </View>
          </View>
        </View>

        {/* Items Dynamic Data Matrix Table Sheet */}
        <View style={styles.table}>
          {/* Header row tag */}
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <Text style={[styles.colNo, styles.thText]}>#</Text>
            <Text style={[styles.colDesc, styles.thText]}>Item Details</Text>
            <Text style={[styles.colQty, styles.thText]}>Qty</Text>
            <Text style={[styles.colRate, styles.thText]}>Rate (₹)</Text>
            <Text style={[styles.colDisc, styles.thText]}>Disc (%)</Text>
            <Text style={[styles.colTax, styles.thText]}>Tax</Text>
            <Text style={[styles.colAmt, styles.thText]}>Amount (₹)</Text>
          </View>

          {/* Mapping iteration rows data stream */}
          {data.items && data.items.map((item, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.colNo}>{idx + 1}</Text>
              <Text style={styles.colDesc}>{item.itemDetails || 'Standard Service Code'}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colRate}>{Number(item.rate).toFixed(2)}</Text>
              <Text style={styles.colDisc}>{item.discount || 0}%</Text>
              <Text style={styles.colTax}>{item.tax || 'Exempt'}</Text>
              <Text style={styles.colAmt}>{Number(item.amount || 0).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Calculations and Summary Block Nodes */}
        <View style={styles.summaryGrid}>
          
          {/* Customer Left Hand side notes compilation */}
          <View style={styles.notesSection}>
            <View style={styles.notesCard}>
              <Text style={styles.notesHeading}>Customer Notes</Text>
              <Text style={{ color: '#475569', lineHeight: 1.3 }}>{data.customerNotes || 'Thank you for the payment.'}</Text>
            </View>
            <View style={styles.notesCard}>
              <Text style={styles.notesHeading}>Terms & Conditions</Text>
              <Text style={{ color: '#475569', lineHeight: 1.3 }}>{data.termsConditions || 'Terms and conditions structural pipeline clause...'}</Text>
            </View>
          </View>

          {/* Financial calculations summary right panel */}
          <View style={styles.calculationSection}>
            <View style={styles.calcRow}>
              <Text style={{ color: '#475569' }}>Sub Total</Text>
              <Text style={{ fontWeight: 'bold' }}>₹ {Number(data.subTotal || 0).toFixed(2)}</Text>
            </View>
            
            <View style={styles.calcRow}>
              <Text style={{ color: '#475569' }}>Shipping Charges</Text>
              <Text style={{ fontWeight: 'bold' }}>₹ {Number(data.shippingCharges || 0).toFixed(2)}</Text>
            </View>

            <View style={[styles.calcRow, { borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 3, marginTop: 2 }]}>
              <Text style={{ color: '#64748B', fontSize: 8 }}>Tax Protocol Selection</Text>
              <Text style={{ color: '#64748B', fontSize: 8 }}>{data.tdsTcsOption || 'TDS'} ({data.taxSelect || 'Select a Tax'})</Text>
            </View>

            <View style={styles.grandTotalRow}>
              <Text style={[styles.grandTotalText, { fontSize: 10, color: '#0F172A' }]}>Total Amount</Text>
              <Text style={styles.grandTotalText}>₹ {Number(data.total || 0).toFixed(2)}</Text>
            </View>
          </View>
          
        </View>

      </Page>
    </Document>
  );
};

export default PDFTemplate;