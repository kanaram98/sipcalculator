import React, { useState } from "react";
import "./sipcalculator.css";
const minPrincipal = 500;
const maxPrincipal = 10000000; // 1 crore
const minYears = 1;
const maxYears = 20;
const defaultRate = 12; // 12% annual return

function calculateSIP(principal, years, rate) {
  const months = years * 12;
  const monthlyRate = rate / 12 / 100;
  // SIP formula: FV = P * [ ( (1 + r)^n - 1 ) / r ] * (1 + r)
  const futureValue =
    principal *
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate));
  return Math.round(futureValue);
}

export default function SipCalculator() {
  const [principal, setPrincipal] = useState(5000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(defaultRate);

  const futureValue = calculateSIP(principal, years, rate);
  const investedAmount = principal * years * 12;
  const gain = futureValue - investedAmount;

  return (
    <div className="sip-container">
      <h2>SIP Calculator</h2>
      <div className="sip-field">
        <label>
          Monthly Investment (₹):
          <input
            type="number"
            min={minPrincipal}
            max={maxPrincipal}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
        </label>
        <input
          type="range"
          min={minPrincipal}
          max={maxPrincipal}
          step={500}
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
        />
        <div className="sip-range-label">
          {minPrincipal.toLocaleString()} &mdash;{" "}
          {maxPrincipal.toLocaleString()}
        </div>
      </div>

      <div className="sip-field">
        <label>
          Investment Duration (Years):
          <input
            type="number"
            min={minYears}
            max={maxYears}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </label>
        <input
          type="range"
          min={minYears}
          max={maxYears}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
        />
        <div className="sip-range-label">
          {minYears} &mdash; {maxYears} years
        </div>
      </div>

      <div className="sip-field">
        <label>
          Expected Annual Return (%):
          <input
            type="number"
            min={1}
            max={30}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </label>
        <input
          type="range"
          min={1}
          max={30}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
        <div className="sip-range-label">1% &mdash; 30%</div>
      </div>

      <div className="sip-summary">
        <div>
          <strong>Total Invested:</strong> ₹{investedAmount.toLocaleString()}
        </div>
        <div>
          <strong>Estimated Returns:</strong> ₹{gain.toLocaleString()}
        </div>
        <div>
          <strong>Maturity Value:</strong>{" "}
          <span>₹{futureValue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
