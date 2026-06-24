import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import ItemForm from './components/ItemForm';
import ItemDetailsView from './components/ItemDetailsView'; 
import Banking from './components/Banking';
import EstimateForm from './components/EstimateForm';
import EstimateDetailsView from './components/EstimateDetailsView';
import InvoiceForm from './components/InvoiceForm'; 
import InvoiceList from './components/InvoiceList'; 

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingEstimate, setIsAddingEstimate] = useState(false);
  
  const [isAddingInvoice, setIsAddingInvoice] = useState(false);
  const [selectedEditInvoice, setSelectedEditInvoice] = useState(null);
  const [invoiceRefreshKey, setInvoiceRefreshKey] = useState(0);

  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [selectedEditCustomer, setSelectedEditCustomer] = useState(null);
  const [customerRefreshKey, setCustomerRefreshKey] = useState(0);
  const [estimateRefreshKey, setEstimateRefreshKey] = useState(0);

  const [summary, setSummary] = useState({ totalReceivables: 0, totalPayables: 0 });

  // 1. Centralized Email Sending Function
  const sendInvoiceEmail = async (clientEmail, clientName, pdfFileName) => {
    try {
      // Aapke Render server ka link laga diya hai
      const res = await fetch('https://ass-1-9y1a.onrender.com/api/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientEmail,
          clientName,
          pdfFileName // Backend ko batane ke liye ki kaunsa file attachment mein bhejna hai
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert('🎉 Invoice successfully email par bhej diya gaya hai!');
      } else {
        alert('❌ Email nahi bheja ja saka: ' + data.message);
      }
    } catch (err) {
      console.error("Error sending email:", err);
      alert('❌ Server se connect karne mein issue aa raha hai.');
    }
  };

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('https://ass-1-9y1a.onrender.com/api/customers/dashboard-summary');
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    if (activePage === 'new-items') setIsAddingItem(true);
    else if (activePage === 'items') setIsAddingItem(false);
    
    if (activePage === 'estimates') setIsAddingEstimate(false);
    
    if (activePage === 'invoices') {
      setIsAddingInvoice(false);
      setSelectedEditInvoice(null);
    }

    if (activePage === 'customers') {
      setIsAddingCustomer(false);
      setSelectedEditCustomer(null);
    }
  }, [activePage]);

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans overflow-hidden">
      <Navbar /> 

      <div className="flex flex-1 overflow-hidden">
        <Sidebar setActivePage={setActivePage} activePage={activePage} />

        <div className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
          
          {activePage === 'dashboard' && <Dashboard summary={summary} />}          
          
          {/* Items Section */}
          {(activePage === 'items' || activePage === 'new-items') && (
            <div className="space-y-6">
              {isAddingItem ? (
                <ItemForm onItemSaved={() => { setIsAddingItem(false); setActivePage('items'); }} />
              ) : (
                <ItemDetailsView onAddNewClick={() => { setIsAddingItem(true); setActivePage('new-items'); }} />
              )}
            </div>
          )}
          
          {/* Customers Section */}
          {activePage === 'customers' && (
            <div className="space-y-6">
              {isAddingCustomer || selectedEditCustomer ? (
                <CustomerForm 
                  editCustomerData={selectedEditCustomer}
                  refreshDashboard={() => { fetchDashboardData(); setCustomerRefreshKey(prev => prev + 1); }}
                  onCancelEdit={() => { setIsAddingCustomer(false); setSelectedEditCustomer(null); }}
                />
              ) : (
                <CustomerList 
                  refreshTrigger={customerRefreshKey}
                  onAddNewCustomerClick={() => { setSelectedEditCustomer(null); setIsAddingCustomer(true); }}
                  onEditCustomerClick={(customerToEdit) => setSelectedEditCustomer(customerToEdit)}
                />
              )}
            </div>
          )}

          {/* Estimates Section */}
          {activePage === 'estimates' && (
            <div className="space-y-6">
              {isAddingEstimate ? (
                <EstimateForm 
                  onEstimateSaved={() => { setEstimateRefreshKey(prev => prev + 1); setIsAddingEstimate(false); }}
                  onCancel={() => setIsAddingEstimate(false)}
                />
              ) : (
                <EstimateDetailsView 
                  key={estimateRefreshKey}
                  onAddNewClick={() => setIsAddingEstimate(true)}
                />
              )}
            </div>
          )}

          {/* Invoices Section */}
          {activePage === 'invoices' && (
            <div className="space-y-6">
              {isAddingInvoice || selectedEditInvoice ? (
                <InvoiceForm 
                  editData={selectedEditInvoice}
                  onInvoiceSaved={() => {
                    setIsAddingInvoice(false);
                    setSelectedEditInvoice(null);
                    setInvoiceRefreshKey(prev => prev + 1);
                    fetchDashboardData();
                  }}
                  onCancel={() => {
                    setIsAddingInvoice(false);
                    setSelectedEditInvoice(null);
                  }}
                />
              ) : (
                // 2. InvoiceList ke andar function ko as a prop pass kar diya hai
                <InvoiceList 
                  refreshTrigger={invoiceRefreshKey}
                  onAddNewClick={() => {
                    setSelectedEditInvoice(null);
                    setIsAddingInvoice(true);
                  }}
                  onEditClick={(targetInvoiceProfileToEdit) => {
                    setSelectedEditInvoice(targetInvoiceProfileToEdit);
                  }}
                  onSendEmailClick={sendInvoiceEmail} // <-- Ye prop ab InvoiceList mein available hai
                />
              )}
            </div>
          )}

          {activePage === 'banking' && <Banking />}

        </div>
      </div>
    </div>
  );
}

export default App;