import React, { useState } from "react";
import '../Produit.css';
import pho1 from "../../../Part/1.png";

const partners = [
  { id: 1, name: 'ASSURLAND', products: '1 produit Sante TNS', info: 'Sante Select Pro', image: pho1, namePro:"Produit Sante TNS disponible" },
  { id: 2, name: 'HYPERASSUR', products: '4 produits Sante TNS', info: 'Information for HYPERASSUR', image: pho1 ,namePro:"Produit Sante TNS disponible"  },
  { id: 3, name: 'LE LYNX', products: '3 produits Sante TNS', info: 'Information for LE LYNX', image: pho1 ,namePro:"Produit Sante TNS disponible" },
];

const SanteTNS = () => {
  const [selectedPartner, setSelectedPartner] = useState(null);

  const handlePartnerClick = (partner) => {
    setSelectedPartner(partner);
  };

  return (
    <div className="app">
      <div className="partner-list-container">
        <div className="partner-list">
          {partners.map((partner) => (
            <button
              key={partner.id}
              className={`partner-item ${selectedPartner?.id === partner.id ? 'selected' : ''}`}
              onClick={() => handlePartnerClick(partner)}
            >
              <div className="partner-details">
                <img src={partner.image} alt={partner.name} className="partner-image" />
                <div className="partner-name">{partner.name}</div>
              </div>
              <div className="partner-products">{partner.products}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="partner-info-container">
        {selectedPartner ? (
          <div className="partner-info">
            <div className="partner-info-header">
            <img src={selectedPartner.image} alt={selectedPartner.name} className="partner-info-image" />
              <div className="partner-info-products">{selectedPartner.namePro}</div>
            </div>
            <div className="partner-info-name">{selectedPartner.name}</div>
            <hr className="divider" />
            <p className="info">{selectedPartner.info}</p>
          </div>
        ) : (
          <div className="partner-info">
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SanteTNS;
