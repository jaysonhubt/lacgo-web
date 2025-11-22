import { defineStore } from 'pinia'

export interface TripSearchData {
  from: string
  to: string
  dateTime: string
  service: string
}

export interface TripData {
  id: number
  driverName: string
  vehicleType: string
  departureTime: string
  rating: number
  reviewCount: number
  price: number
  pickupLocation: string
  status: 'searching' | 'found' | 'completed'
}

export const useTripStore = defineStore('trip', {
  state: () => ({
    searchData: {
      from: '',
      to: '',
      dateTime: '',
      service: '1'
    } as TripSearchData,
    currentTrip: null as TripData | null,
    tripHistory: [] as TripData[],
    isSearching: false,
    searchProgress: 0
  }),

  getters: {
    hasSearchData: (state) => {
      return state.searchData.from && state.searchData.to
    },
    
    getServiceLabel: () => (service: string) => {
      const serviceLabels: { [key: string]: string } = {
        '1': '1 chỗ',
        '2': '2 chỗ', 
        'back': 'Hàng sau',
        'whole': 'Cả xe',
        'small': 'Gửi đồ nhỏ',
        'large': 'Gửi đồ to'
      }
      return serviceLabels[service] || '1 chỗ'
    }
  },

  actions: {
    setSearchData(data: TripSearchData) {
      this.searchData = data
    },

    setCurrentTrip(trip: TripData) {
      this.currentTrip = trip
    },

    addToHistory(trip: TripData) {
      this.tripHistory.unshift(trip)
    },

    startSearch() {
      this.isSearching = true
      this.searchProgress = 0
    },

    updateSearchProgress(progress: number) {
      this.searchProgress = progress
    },

    completeSearch(trip: TripData) {
      this.isSearching = false
      this.searchProgress = 0
      this.currentTrip = trip
      this.addToHistory(trip)
    },

    clearSearch() {
      this.searchData = {
        from: '',
        to: '',
        dateTime: '',
        service: '1'
      }
      this.currentTrip = null
      this.isSearching = false
      this.searchProgress = 0
    }
  },

  persist: true
})
