import React from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

const route=[
    {path:"/mycart", breadcrumb:"Shopping Cart"},
    {path:"/pages", breadcrumb:"Product List"},
    {path:"/blog", breadcrumb:"Blog Lists"},
    {path:"/contact", breadcrumb:"Contacts"},
]
function BreadCrumb() {
    const BreadCrumb=useBreadcrumbs(route)
  return (
    <div>
      {BreadCrumb.map(({el,breadcrumb})=>{
        <span key={el.pathname}>
            {breadcrumb}.
        </span>
      })}
    </div>
  )
}

export default BreadCrumb
