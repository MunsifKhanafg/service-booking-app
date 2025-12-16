# Project Updates Required

## Overview
This document outlines the changes needed for the service booking app.

## Changes to Make:

### 1. Remove Featured Services Section (Home.jsx)
- Remove the featured services filter logic
- Remove the "Featured Services" heading and grid
- Keep only "All Services" section

### 2. Add Hero Section Animations (Home.jsx)
- Add smooth fade-in animations to search bar
- Add pulse/glow effects to the banner
- Add hover effects on search input

### 3. Update services.json
- Replace current SVG images with better gradient designs
- Add 50 total service items (currently only ~10)
- Improve service descriptions

### 4. Enhance ServiceCard Component
- Add smooth hover lift effect
- Add shadow transitions
- Add image zoom on hover
- Improve card border and spacing

### 5. Update Git and Deploy
- Commit all changes
- Push to GitHub
- Verify deployment

## Priority Order:
1. Remove Featured Services
2. Update services.json with 50 items
3. Add animations
4. Enhance cards
5. Deploy

## Files to Modify:
- src/pages/Home.jsx
- src/components/ServiceCard.jsx  
- public/services.json
