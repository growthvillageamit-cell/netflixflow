import { useState } from 'react';
import { User } from '../types';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
  myList: ['1', '3', '5'],
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(mockUser);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({ ...mockUser, name, email });
      setIsLoading(false);
    }, 1500);
  };

  const logout = () => {
    setUser(null);
  };

  const addToMyList = (movieId: string) => {
    if (user && !user.myList.includes(movieId)) {
      setUser({
        ...user,
        myList: [...user.myList, movieId],
      });
    }
  };

  const removeFromMyList = (movieId: string) => {
    if (user) {
      setUser({
        ...user,
        myList: user.myList.filter(id => id !== movieId),
      });
    }
  };

  const isInMyList = (movieId: string) => {
    return user?.myList.includes(movieId) || false;
  };

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    addToMyList,
    removeFromMyList,
    isInMyList,
  };
};