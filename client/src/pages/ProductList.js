import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  TextField, 
  InputAdornment, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  CardActionArea,
  Chip,
  Rating,
  Pagination,
  Stack,
  useMediaQuery,
  useTheme,
  CardActions,
  IconButton,
  Divider,
  Breadcrumbs,
  Link
} from '@mui/material';
import { 
  AddShoppingCart, 
  Search, 
  ViewList, 
  GridView, 
  FavoriteBorder, 
  Favorite,
  Home as HomeIcon,
  Store as StoreIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { mockProducts } from '../data/mockData';

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const ProductList = ({ addToCart }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  
  const itemsPerPage = 12;
  const categories = ['All', ...new Set(products.map(product => product.category))];
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    setFilteredProducts(filtered);
    setPage(1);
  }, [searchTerm, category, products]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
  };

  const toggleFavorite = (e, productId) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" href="/">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography color="text.primary">Shop</Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          Our Products
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          High-quality organic compost and gardening supplies
        </Typography>
      </Box>

      {/* Filters and Search */}
      <Box sx={{ mb: 6, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth={isMobile}
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: 2, bgcolor: 'background.paper' }
          }}
        />
        
        <FormControl variant="outlined" sx={{ minWidth: isMobile ? '100%' : 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            sx={{ borderRadius: 2, bgcolor: 'background.paper' }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Box sx={{ display: 'flex', ml: isMobile ? 0 : 'auto' }}>
          <IconButton onClick={() => setView('grid')} color={view === 'grid' ? 'primary' : 'default'}>
            <GridView />
          </IconButton>
          <IconButton onClick={() => setView('list')} color={view === 'list' ? 'primary' : 'default'}>
            <ViewList />
          </IconButton>
        </Box>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={4}>
        {paginatedProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard>
              <CardActionArea onClick={() => handleProductClick(product.id)}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                    <IconButton 
                      onClick={(e) => toggleFavorite(e, product.id)}
                      sx={{ 
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.paper' }
                      }}
                    >
                      {favorites.includes(product.id) ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </Box>
                  {product.isNew && (
                    <Chip 
                      label="NEW" 
                      color="secondary" 
                      size="small" 
                      sx={{ 
                        position: 'absolute', 
                        top: 10, 
                        left: 10,
                        fontWeight: 'bold'
                      }} 
                    />
                  )}
                </Box>
                
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip 
                      label={product.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ mb: 1, fontWeight: 'medium' }}
                    />
                    <Typography variant="subtitle2" color="text.secondary">
                      {product.weight}
                    </Typography>
                  </Box>
                  
                  <Typography gutterBottom variant="h6" component="h3" sx={{ 
                    fontWeight: 600, 
                    minHeight: '3em',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {product.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Rating value={product.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>
                  
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
                    R{product.price.toFixed(2)}
                  </Typography>
                  
                  <Box component="ul" sx={{ 
                    pl: 2, 
                    mb: 2, 
                    '& li': { 
                      fontSize: '0.85rem',
                      color: 'text.secondary',
                      mb: 0.5,
                      '&:before': {
                        content: '"•"',
                        color: 'primary.main',
                        display: 'inline-block',
                        width: '1em',
                        ml: -1
                      }
                    } 
                  }}>
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCart />}
                    onClick={(e) => handleAddToCart(e, product)}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </CardActionArea>
            </ProductCard>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            size={isMobile ? 'small' : 'medium'}
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'text.primary',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default ProductList;
