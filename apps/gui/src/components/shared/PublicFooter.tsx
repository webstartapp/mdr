import { Shield } from 'lucide-react';

const PublicFooter = (): React.JSX.Element => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-secondary" />
              <span className="text-xl font-heading font-bold tracking-tight">
                MDR <span className="text-secondary">Adviser</span>
              </span>
            </div>
            <p className="text-white/70 max-w-sm text-sm">
              The premier regulatory advisor for Medical Device Regulation (MDR 2017/745). 
              Ensuring compliance, safety, and innovation for global manufacturers.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4 uppercase tracking-wider text-xs text-secondary">Resources</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Legislative Database</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technical File Templates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">QMS Standards</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4 uppercase tracking-wider text-xs text-secondary">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-secondary/60">
          © {new Date().getFullYear()} MDR Regulation Adviser. All rights reserved. Professional medical compliance solution.
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
