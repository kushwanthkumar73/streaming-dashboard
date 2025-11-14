import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background to-background/0 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-md group-hover:scale-110 transition-transform duration-300">
            <Film className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            StreamFlix
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Movies
          </Link>
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            TV Shows
          </Link>
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            My List
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
