import { Header } from './components/Header';
import { DateSelector } from './components/DateSelector';
import { InputArea } from './components/InputArea';
import { RecordTable } from './components/RecordTable';
import { Statistics } from './components/Statistics';
import { ExportButton } from './components/ExportButton';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <DateSelector />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2 lg:col-span-1">
            <InputArea />
            <ExportButton />
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <Statistics />
            <RecordTable />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
