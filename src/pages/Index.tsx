import Header from '@/components/Header';
import ComparisonTool from '@/components/ComparisonTool';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ComparisonTool />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
