export const getStatusColor = status => {
    switch (status) {
      case 'diterima': return 'sky'
      case 'dialihkan': return 'sun'
      case 'menunggu-persetujuan': return 'brown'
      case 'dibatalkan': return 'red'
      case 'berjalan': return 'flora'
      default: return 'black'
    }
  }
  