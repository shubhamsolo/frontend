import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const [displayedText, setDisplayedText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fullText = "Search, Apply & Get Your Dream Jobs";
    const indexRef = useRef(0);

    useEffect(() => {
        const typeWriterEffect = () => {
            if (indexRef.current <= fullText.length) {
                setDisplayedText(fullText.slice(0, indexRef.current));
                indexRef.current++;
                setTimeout(typeWriterEffect, 90);
            }
        };
        typeWriterEffect();
    }, []);

    const searchJobHandler = () => {
        if (query.trim() === "") {
            return;
        }
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className='hero-section-container'>
            <div className='hero-content'>
                <span className='badge'>No. 1 Job Hunt Website</span>
                <h1 className='hero-title' aria-live="polite">
                    {displayedText.includes("Dream Jobs") ? (
                        <>
                            {displayedText.replace("Dream Jobs", "")}
                            <span className="highlight">Dream Jobs.</span>
                        </>
                    ) : (
                        displayedText
                    )}
                    <span className="cursor">|</span>
                </h1>
                <p className='hero-subtitle'>
                    Discover and apply for the latest job opportunities. Check back regularly for new openings and updates!
                </p>
                <div className='search-bar'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='search-input'
                        aria-label="Search for jobs"
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="search-button" 
                        aria-label="Search"
                    >
                        <Search className='icon' />
                    </Button>
                </div>
                {query.trim() === "" && (
                    <span className="error-message">Please enter a job title or keyword.</span>
                )}
            </div>
        </div>
    );
};

export default HeroSection;
