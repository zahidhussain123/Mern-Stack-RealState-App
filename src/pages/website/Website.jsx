import React from 'react'
import Hero from "../../components/hero/Hero"
import Companies from "../../components/companies/Companies"
import Residency from "../../components/residency/Residency"
import AccordianInterface from "../../components/accordianInterface/AccordianInterface"
import Contact from "../../components/contact/Contact"
import GetStarted from "../../components/getStarted/GetStarted"
import "./website.css"

const Website = () => {
  return (
    <div className="App">
    <div>
      <div className="white-gradient" />
        <Hero />
    </div>
    <Companies />
    <Residency />
    <AccordianInterface />
    <Contact />
    <GetStarted />
  </div>
  )
}

export default Website