// import React, { Component } from 'react';

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false, errorInfo: null };
//   }

//   componentDidCatch(error, info) {
//     this.setState({ hasError: true, errorInfo: info });
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className='con-a'>
//           <h1>Une erreur s'est produite dans le composant :</h1>
//           <pre>{this.state.errorInfo.componentStack}</pre>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
