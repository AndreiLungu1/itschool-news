import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import './Layout.css';

export default function Layout(props) {
    // Componenta Layout primeste ca si copii anumite tag-uri atunci cand este instantiata - asadar ma folosesc de props.children pentru a putea randa acei copii
    return (
        <div className="layout">
            <Header />
            <main>{props.children}</main>
            <Footer />
        </div>
    )
}