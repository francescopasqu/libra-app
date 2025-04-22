import Navbar from "../components/Navbar";
function Dashboard() {
  return (
    <>
      <Navbar />
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-primary">Benvenuto nella Dashboard</h1>
      <p className="text-gray-600 mt-2">Qui vedrai i tuoi contenuti.</p>
    </div>
    </>
  )
}

export default Dashboard
