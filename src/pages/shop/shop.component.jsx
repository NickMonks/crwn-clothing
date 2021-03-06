import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

//import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
/* Because we need to store data from actual components, we make it a class component*/
/* Shopage is wrapped inside route, so we automatically passes to match, location, history, we want match  */

/* We simply use this components wrapped inside the Router*/
//onst CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
//const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({fetchCollectionsStart,match}) => {
    
  useEffect(()=>{
    fetchCollectionsStart();
  },[fetchCollectionsStart]);
  // we need to be careful, since if we don't provide arguments the shoppage will render twice, once
  // due to the app.js render (the first render of all components), and a second one in case a currentUser is changed 

    return (
        <div className='shop-page'>
        <Route exact path={`${match.path}`} 
                      component={CollectionsOverviewContainer}
                      // A container is replaced so that we can separate the responsabilities
                      // from isCollectionFetched, and basically connect all elements together
                      />
        <Route path={`${match.path}/:collectionId`} 
                      component={CollectionPageContainer}
                      
                      //render={(props) => 
                      // <CollectionPageWithSpinner
                      // If collection is not loaded, then this will be set to true
                      // and tell the spinner to render ( the problem is if we re-load the webpage
                      // we will see that the isLoading is re-set to false), so we need to use this parameter

                      // isLoading={!isCollectionLoaded} {...props} />} 
                      />  
        
    </div>
    )
};
/* it provides us the current endpoint ,/shop for example*/
  

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect( null,
                        mapDispatchToProps)
                        (ShopPage);

