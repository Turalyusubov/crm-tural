import { FilterProps } from "@/shared/types"
import { Drawer } from "antd"
import Employee from "./Employee"
import Report from "./Report"
import Team from "./Team"
import Project from "./Project"

const Filter: React.FC<FilterProps> = ({ modalOpen, setModalOpen, statusType }) => {
    const status = {
        employee: <Employee />,
        team: <Team />,
        project: <Project />,
        report: <Report />
    }

    return (
        <Drawer title="Filter" onClose={() => setModalOpen(false)} open={modalOpen}>
            {statusType !== 'resetPassword' && status[statusType]}
        </Drawer>
    )
}

export default Filter