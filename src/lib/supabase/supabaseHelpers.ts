import supabase from './supabaseClient';

export const fetchProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    throw error;
  }
  console.log(data);

  return data;
};
