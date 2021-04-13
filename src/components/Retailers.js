import '../styles/retailers.css';
import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import fetchRetailers from '../api';

function Retailers() {

  const [retailers, setRetailers] = useState({});
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  useEffect(() => {
    const getData = async() => await fetchRetailers().then(async (result) => {
      const res = await result.json();
      setRetailers(res.data.retailers);
    });

    try {
      getData();
    } catch(error) {
      console.log("error", error)
    }
    
}, []);

function saveSelectedItem(selectedItem) {
    setSelectedRetailer(selectedItem);
    localStorage.setItem("selectedRetailer", selectedItem);
}

function createDropDown() {
  let retailItems = [];

  const savedItem = localStorage.getItem("selectedRetailer");

  if( retailers.length > 0 ) {
    for (var i = 0; i < retailers.length; i++) { 
      let retailer = retailers[i];
      retailItems.push(<Dropdown.Item active={((selectedRetailer===retailer.id) || (savedItem==retailer.id)) ? true : false} key={i} onSelect={() => saveSelectedItem(retailer.id)}>{retailer.name}</Dropdown.Item>);
    }  
    
    return (
    <DropdownButton id="retail-dropdown" title="Retailers">
      {retailItems}
    </DropdownButton>
    )
  }          
}

function renderLogo() {
    let selected = "";
    const savedItem = localStorage.getItem("selectedRetailer");
    if(retailers.length>0 && savedItem!==null) {
        selected = retailers.find(element => element.id==savedItem);
        return (
            <img src={selected.logoUrl} />
        )
    }
}

  return (
    <div className="retailers">
      <header className="retailers-container">
          <div className="retailers-dropdown">
            {createDropDown()}
          </div>
          <div className="retailer-info">
             {renderLogo()}
          </div>
      </header>
    </div>
  );

}

export default Retailers;