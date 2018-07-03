import { connect } from 'react-redux';

import { StoreState } from '../store/store';
import { moveDialogAction, Select_Dialog } from '../actions/dialogActions';
import DialogWrapper from '../components/DialogWrapper';

const mapStateToProps= ({currentConversation}: StoreState) => {
    return {dialog:currentConversation};
};
const mapDispatchToProps = (dispatch: Dispatch<Select_Dialog>) => {
    return {moveActionCreator: (path) => dispatch(moveDialogAction(path))}
}
export default connect(mapStateToProps, mapDispatchToProps)(DialogWrapper);
