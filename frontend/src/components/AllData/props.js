import { deleteTask } from "../../store/asyncMethods/taskMethods";

const mapDispatchToProps = dispatch => (
    {
        deleteTask: (id) => dispatch(deleteTask(id))
    }
)
export { mapDispatchToProps };