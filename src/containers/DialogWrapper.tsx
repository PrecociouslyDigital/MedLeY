import { connect } from 'react-redux';
import { StoreState } from '../store/store';
import { DialogWrapperWrapper }  from '../components/DialogWrapper';

const mapStateToProps= ({gameState, uiState}: StoreState) => ({
    dialog:gameState.currentConversation,
    index:uiState.messageIndex
});

export default connect(mapStateToProps)(DialogWrapperWrapper);
