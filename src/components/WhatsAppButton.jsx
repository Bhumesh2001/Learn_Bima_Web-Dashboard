import React from "react";

export default function WhatsAppButton({ number = "917981563903" }) {
    return (
        <a
            href={`https://wa.me/${number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-500 hover:bg-green-600 transition-colors shadow-lg rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center z-50"
            aria-label="Chat on WhatsApp"
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-6 h-6 sm:w-8 sm:h-8"
            />
        </a>
    );
};
