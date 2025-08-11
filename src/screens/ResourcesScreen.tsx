import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { useAppStore } from '../store/zustandStore';
import { fetchResources, deleteResource } from '../store/slices/resourcesSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ResourcesScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { resources, loading } = useSelector((state: RootState) => state.resources);
  const { isDarkMode } = useAppStore();
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    if (user) {
      dispatch(fetchResources(user.uid));
    }
  }, [dispatch, user]);

  const onRefresh = () => {
    if (user) {
      dispatch(fetchResources(user.uid));
    }
  };

  const handleDeleteResource = (resourceId: string) => {
    Alert.alert(
      'Delete Resource',
      'Are you sure you want to delete this resource?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteResource(resourceId)),
        },
      ]
    );
  };

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'picture-as-pdf';
      case 'note':
        return 'note';
      case 'video':
        return 'video-library';
      case 'link':
        return 'link';
      default:
        return 'description';
    }
  };

  const getResourceTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return '#ef4444';
      case 'note':
        return '#10b981';
      case 'video':
        return '#3b82f6';
      case 'link':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const filteredResources = resources.filter(resource => {
    if (selectedFilter === 'all') return true;
    return resource.type === selectedFilter;
  });

  const filters = [
    { key: 'all', label: 'All', icon: 'list' },
    { key: 'pdf', label: 'PDFs', icon: 'picture-as-pdf' },
    { key: 'note', label: 'Notes', icon: 'note' },
    { key: 'video', label: 'Videos', icon: 'video-library' },
    { key: 'link', label: 'Links', icon: 'link' },
  ];

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <View className={`p-6 pb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <View className="flex-row justify-between items-center">
          <Text className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Resources
          </Text>
          <TouchableOpacity className="p-2">
            <Icon
              name="add"
              size={24}
              color={isDarkMode ? '#3b82f6' : '#3b82f6'}
            />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              onPress={() => setSelectedFilter(filter.key)}
              className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                selectedFilter === filter.key
                  ? 'bg-blue-600'
                  : isDarkMode
                  ? 'bg-gray-700'
                  : 'bg-gray-200'
              }`}
            >
              <Icon
                name={filter.icon}
                size={16}
                color={
                  selectedFilter === filter.key
                    ? '#ffffff'
                    : isDarkMode
                    ? '#d1d5db'
                    : '#6b7280'
                }
              />
              <Text
                className={`ml-2 text-sm font-medium ${
                  selectedFilter === filter.key
                    ? 'text-white'
                    : isDarkMode
                    ? 'text-gray-300'
                    : 'text-gray-700'
                }`}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Resources List */}
      <ScrollView
        className="flex-1 px-6"
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        {filteredResources.length === 0 ? (
          <View className={`p-8 rounded-lg items-center mt-8 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Icon name="folder-open" size={64} color="#9ca3af" />
            <Text className={`text-lg font-medium mt-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              No resources found
            </Text>
            <Text className={`text-sm text-center mt-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {selectedFilter === 'all'
                ? 'Add your first study resource'
                : `No ${selectedFilter} resources found`}
            </Text>
          </View>
        ) : (
          <View className="space-y-3 mt-4">
            {filteredResources.map((resource) => (
              <TouchableOpacity
                key={resource.id}
                className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <View className="flex-row items-center">
                  <Icon
                    name={getResourceTypeIcon(resource.type)}
                    size={24}
                    color={getResourceTypeColor(resource.type)}
                  />
                  <View className="flex-1 ml-3">
                    <Text className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {resource.title}
                    </Text>
                    <Text className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {resource.description}
                    </Text>
                    <Text className={`text-xs mt-1 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <View className="flex-row">
                    <TouchableOpacity className="p-2">
                      <Icon
                        name="play-circle-outline"
                        size={20}
                        color={isDarkMode ? '#3b82f6' : '#3b82f6'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="p-2"
                      onPress={() => handleDeleteResource(resource.id)}
                    >
                      <Icon
                        name="delete-outline"
                        size={20}
                        color={isDarkMode ? '#ef4444' : '#ef4444'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ResourcesScreen; 