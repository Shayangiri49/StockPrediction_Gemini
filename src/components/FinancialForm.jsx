import React, { useState } from 'react'
import "./FinancialForm.css"
import { HashLoader } from 'react-spinners';

const API_KEY = import.meta.env.VITE_REACT_APP_GEMINI_API;


export const FinancialForm = ({setResult}) => {
    const [values, setValues] = useState({
        marketPrice: "50",
        eps: "5",
        bookValue: "25",
        sales: "10",
        annualDividends: "2",
        previousEps: "4",
        currentEps: "5",
        totalDebt: "100",
        totalEquity: "200",
        netIncome: "30"
    })

    const [isSent, setIsSent] = useState(true);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name] : value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);

        const trainingPrompt = [
            {
                "parts": [
                    {
                        "text" : "From next prompt I am gonna send you some parameters for predicting stock market share , tell me is it overvalued or undervalued , buy or not"
                    }
                ],
                "role" : "user"
            },
            {
                "role" : "model",
                "parts" : [{
                    "text" : "okay"
                }]
            },
            {
                "role" : "user",
                "parts" : [{
                    "text" : "and also calculate - P/E ratio , P/B ratio , P/S ratio , Dividend Yield , Earnings Growth in % , Debt-to-Equity ratio , ROE % and give as a response"
                }]
            },
            {
                "role" : "model",
                "parts" : [{
                    "text" : "okay"
                }]
            },
            {
                "role" : "user",
                "parts" : [{
                    "text" : "always give response in form of HTML div and table tag"
                }]
            },
            {
                "role" : "model",
                "parts" : [{
                    "text" : "okay"
                }]
            },
        ]

        let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`

        let messagesToSend = [
            ...trainingPrompt,
            {
                "role" : "user",
                "parts" : [{
                    "text" : JSON.stringify(values)
                }]
            }
        ]

        setIsSent(false)

        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "contents": messagesToSend
            })
        })
        let resjson = await res.json()
        setIsSent(true)
        let responseMessage = resjson.candidates[0].content.parts[0].text
        // console.log(responseMessage);
        setResult(responseMessage)
    }
  return (
    <form className='form-container' onSubmit={handleSubmit}>
        <div className='coolinput'>
            <label for="input" class="text">Market Price Per Share:</label>
            <input class="input" type="number" name='marketPrice' value={values.marketPrice} onChange={handleChange} required />
        </div>
        <div className='coolinput'>
            <label for="input" class="text">Earning Per Share:</label>
            <input type="number" name='eps' value={values.eps} onChange={handleChange} required/>
        </div>
        <div className='coolinput'>
            <label for="input" class="text">Book Value Per Share:</label>
            <input type="number" name='bookValue' value={values.bookValue} onChange={handleChange} required/>
        </div>
        <div className='coolinput'>
            <label for="input" class="text">Sales Per Share:</label>
            <input type="number" name='sales' value={values.sales} onChange={handleChange} required/>
        </div>
        <div className='coolinput'>
            <label for="input" class="text">Annual Dividends Per Share:</label>
            <input type="number" name='annualDividends' value={values.annualDividends} onChange={handleChange} required/>
        </div>
        <div className='coolinput'>
            <label for="input" class="text">Previous Year's EPS:</label>
            <input type="number" name='previousEps' value={values.previousEps} onChange={handleChange} required/>
        </div>
        <div className='coolinput'>
            <label for="input" class="text">Current Year's EPS:</label>
            <input type="number" name='currentEps' value={values.currentEps} onChange={handleChange} required/>
        </div>
        <div className='coolinput'>
            <label for="input" class="text">Total Debt:</label>
            <input type="number" name='totalDebt' value={values.totalDebt} onChange={handleChange} required/>
        </div>
        <div className='coolinput'>
            <label for="input" class="text">Total Equity:</label>
            <input type="number" name='totalEquity' value={values.totalEquity} onChange={handleChange} required/>
        </div>
        <div className='coolinput'>
            <label for="input" class="text">Total Income:</label>
            <input type="number" name='netIncome' value={values.netIncome} onChange={handleChange} required/>
        </div>

        {
            isSent ? 
<button type='submit'>Submit</button>
:
<HashLoader className='loader'/>
        }
        
    </form>
  )
}
