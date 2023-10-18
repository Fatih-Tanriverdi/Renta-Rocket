import React, { useEffect, useState } from 'react'
import "../Products/SpaceShips.css";
import { checkToken } from '../../services/AuthService';
import { TableListComp } from "../../components/TableListComp/TableListComp"
import { SearchBarComp } from "../../components/SearchBarComp/SearchBarComp"
import UserDropdownMenu from '../../components/UserDropdownMenu/UserDropdownMenu';
import { deleteRocket, fetchRocketsGet, putRocket } from '../../services/RocketService';
import EditModal from '../../components/EditModal/EditUserModal';


export default function SpaceShips() {
    const [selectedRocket, setSelectedRocket] = useState(null);
    const [spaceShipData, setSpaceShipData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns = [
        {
            title: 'EDIT',
            dataIndex: 'id',
            key: 'id',
            render: (id, record) => (
                <UserDropdownMenu
                    onEditClick={() => handleEditRocket(id)}
                    onDeleteClick={() => handleDeleteRocket(id)}
                />
            ),
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'user',
        },
        {
            title: 'MODEL NAME',
            dataIndex: 'modelName',
            key: 'modelName',
        },
        {
            title: 'MODEL YEARS',
            dataIndex: 'modelYear',
            key: 'modelYear',
        },
        {
            title: 'SERI NO',
            key: 'serialNumber',
            dataIndex: 'serialNumber',
        },
        {
            title: 'SEAT NUMBER',
            key: 'maxNumberOfPassengers',
            dataIndex: 'maxNumberOfPassengers',
        },
        {
            title: 'AGE LIMIT',
            dataIndex: 'ageLimit',
            key: 'ageLimit',
        },
        {
            title: 'DESCRIPTION',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function fetchSpaceShipData() {
            const url = "http://lambalog.com/api/space-vehicles";
            const data = await fetchRocketsGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                });
            setSpaceShipData(data);
        }
        fetchSpaceShipData();
    }, []);

    const handleDeleteRocket = (id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        deleteRocket(id)
            .then(() => {
                setSpaceShipData((prevSpaceShipData) =>
                    prevSpaceShipData.filter((rocket) => rocket.id !== id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const updateRocket = (id, updatedData) => {
        putRocket(id, updatedData)
            .then((responseData) => {
                console.log('Rocket güncellendi:', responseData);
                setIsModalOpen(false);
                setSpaceShipData(responseData);
            })
            .catch(error => {
                console.error('Güncelleme isteği başarısız oldu:', error);
            });
    };

    const handleEditRocket = (id) => {
        const rocketEdit = spaceShipData.find(rocket => rocket.id === id);
        setSelectedRocket(rocketEdit);
        setIsModalOpen(true);
    };
    

    const handleModalClose = () => {
        setSelectedRocket(null);
        setIsModalOpen(false);
    };


    return (
        <container className='space-vehicle-container'>
            <article className='space-vehicle-body'>
                <div className='product-list'>
                    <div>
                        <SearchBarComp />
                    </div>
                    <div>
                        <TableListComp columns={columns} dataSource={spaceShipData} text="spaceShips" />
                        {isModalOpen && (
                            <EditModal rocket={selectedRocket} onSave={updateRocket} onCancel={handleModalClose} visible={isModalOpen} pageType={"spaceShips"}/>
                        )}
                    </div>
                </div>
            </article>
        </container>
    )
}

