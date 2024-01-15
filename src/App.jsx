import { QuotingProvider } from "./context/QuotingProvider"
import AppInsurance from "./components/AppInsurance"

function App() {
    return (
      <QuotingProvider>
        <AppInsurance />
      </QuotingProvider>
    )
}

export default App
