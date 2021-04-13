import React from "react";

async function fetchRetailers() {
    const retailers = fetch('http://prod-cart.chicoryapp.com/api/graph/', { 
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        query: `query retailers{
        retailers(zipCode: "11234", blacklistedRetailers: [], whitelistedRetailers: []) {
        id
        slug
        shopOnLogoUrl
        logoUrl
        name
        requiresLocation
        }
        }`})
    });
    return await retailers;
}

export default fetchRetailers;