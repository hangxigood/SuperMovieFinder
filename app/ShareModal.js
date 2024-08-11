'use client';
import XIcon from "./x_icon";
import { useState } from "react";
import { FaCopy } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";


const ShareModal = ({ isOpen, onClose, favouritesarray }) => {
    if (!isOpen) return null;
  
    const shareText = `Check out my favorite movies:\n${favouritesarray.map(movie => movie.title).join('\n')}\n`;
    const shareUrl = window.location.href;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    const [isCopied, setIsCopied] = useState(false);
  
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

    const handleCopyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      };
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
        <div className="bg-black p-8 rounded-lg relative w-full max-w-md">
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2"
            aria-label="Close"
          >
            <XIcon color={'red'} />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-white">Share to:</h2>
          <div className="space-y-4">
          <div className="flex items-center">
            <FaSquareXTwitter className="text-white mr-2" size={24} />
            <a 
            href={twitterUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-blue-400 text-lg"
            >
            Twitter
            </a>
          </div>
            <button 
            onClick={handleCopyToClipboard} 
            className="flex items-center text-white hover:text-blue-400 text-lg"
          >
            <FaCopy className="mr-2" /> 
            {isCopied ? "Copied!" : "Copy to clipboard for Email"}
          </button>
          </div>
        </div>
      </div>
    );
  };

export default ShareModal;