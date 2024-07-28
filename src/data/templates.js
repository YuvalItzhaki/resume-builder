export const templates = {
  modern: {
    resume: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: "'Times New Roman', Times, serif",
      color: '#333'
    },
    topbar: {
      width: '100%',
      // backgroundColor: '#f1f1f1',
      padding: '10px',
      textAlign: 'center',
      // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    sectionTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      margin: '0'
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%'
    },
    sidebar: {
      fontFamily: "'Times New Roman', Times, serif",

      width: '30%',
      backgroundColor: '#f9f9f9',
      padding: '10px'
    },
    mainContent: {
      width: '70%',
      padding: '10px'
    },
    sectionContent: {
      marginBottom: '10px'
    }
  },
  classic: {
    resume: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      color: '#333'
    },
    header: {
      textAlign: 'center',
      marginBottom: '10px'
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%'
    },
    sidebar: {
      width: '30%',
      backgroundColor: '#f9f9f9',
      padding: '10px'
    },
    mainContent: {
      width: '70%',
      padding: '10px'
    },
    sectionContent: {
      marginBottom: '10px'
    },
    profileSection: {
      marginBottom: '20px',
      backgroundColor: '#073763',
      color: '#FFFFFF'

    }
  }
};
