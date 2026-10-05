# AI Workshop Growth Engine

## Objective
Get 500 final-year engineering students to register for the "Build Your First AI Project in 60 Minutes" workshop in 7 days, with a ₹2,000 budget.

## Problem
Final-year engineering students are stressed about placements and lack modern skills on their resumes. They want to learn AI but are intimidated by complex tutorials and lack the time for multi-week courses.

## Solution
An interactive "Growth Engine" web app that acts as a personalized funnel. Instead of a static landing page, it asks the user for their goals, tailors the value proposition, captures the registration, and immediately pushes them into a gamified referral loop.

## Growth Strategy
With only ₹2,000, traditional algorithmic paid ads (Facebook/Meta) will fail due to the learning phase. The strategy relies on:
1. **WhatsApp Communities**: Organic reach via campus ambassadors (250 regs).
2. **Micro-Sponsorships**: ₹1,000 spent on niche engineering Instagram pages (100 regs).
3. **Incentivized Referral Loop**: ₹1,000 spent on Amazon Gift Cards for the top 2 referrers, creating viral sharing within campus groups (150 regs).

**Target CAC**: ₹4 per registration.

## Product Flow
**Discovery** → **AI Personalization Quiz** → **Personalized Pitch** → **Registration Form** → **Gamified Referral Leaderboard** → **Analytics Dashboard**

## Experiments
1. **Message Test**: 
   - Hypothesis: A placement-oriented message will generate more registrations than generic AI-learning messaging.
2. **Referral Test**:
   - Hypothesis: Students will share the workshop more frequently when referral progress and a leaderboard are visible.
3. **AI Personalization Test**: 
   - Hypothesis: Personalized messaging based on the student's goal will increase registration conversion.

## AI Usage
AI was used to:
- Brainstorm initial value propositions.
- Scaffold the React application and Tailwind CSS structures.
- Generate the simulated data for the dashboard.

## Limitations
- **Data is Simulated**: This is a prototype/simulation. No real students were contacted, and all data displayed in the dashboard is synthetic demo data.
- **Mock AI Layer**: The personalization logic is hardcoded for demonstration purposes rather than making live API calls to an LLM, ensuring the frontend remains fast, free to host, and doesn't expose API keys.

## Future Improvements
If given another 24 hours, I would:
1. Integrate a WhatsApp API to automatically text students their referral links, reducing drop-off on the post-registration screen.
2. Implement an automated email sequence reminding them of the workshop time to improve the actual attendance rate (not just registration rate).
3. Connect the frontend to a real Supabase/Firebase backend to handle live A/B test traffic routing.

## Local Setup
```bash
npm install
npm run dev
```
Open `http://localhost:5173`
