import React from 'react'
import Navbar from '../components/Navbar'
import './PageLayout.css'

import ReduxBugReporter from 'redux-bug-reporter'
import 'redux-bug-reporter/dist/redux-bug-reporter.css'

import { fromJS } from 'immutable'
const customEncode = (state) => {
    return state.hasOwnProperty('fields') ? {
        immutableState: Object.assign(state.fields.toJSON(), state.forms.toJSON())
        // mutableState: state.mutableState
    } : {}
}

const customDecode = (state) => {
    return {
        immutableState: fromJS(state.immutableState),
        // mutableState: state.mutableState
    }
}

const PageLayout = ({ children }) => (
	<div className="page-layout-contianer">
		<Navbar />
		<div className="page-layout-main-window">
			{children}
			{process.env.NODE_ENV !== 'production' && 
				<ReduxBugReporter 
					submit='http://localhost:3000/bugs'
					projectName='Test'
					customDecode={customDecode}
					customEncode={customEncode} 
				/>}
		</div>
	</div>
)
	
export default PageLayout