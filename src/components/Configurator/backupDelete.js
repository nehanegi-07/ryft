import { useState, useEffect } from 'react';
import Icon from '@mui/material/Icon';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import ConfiguratorRoot from './ConfiguratorRoot';
import { Autocomplete } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';

import {
    useMaterialUIController,
    setOpenConfigurator,
    setTransparentSidenav,
    setWhiteSidenav,
    setMiniSidenav,
    setFixedNavbar,
    setSidenavColor,
    setDarkMode,
} from 'context';
import { Preview, SignalCellularConnectedNoInternet0BarSharp } from '@mui/icons-material';
import { changeAdminColumnVisibility } from 'services/Admin.Services';
import { useMutation, useQueryClient } from 'react-query';
import { notifySuccess } from 'components/Messages';
import { notifyError } from 'components/Messages';

function Configurator({
    visibleColumn,
    columnPreference,
    setColumnsFields
}) {
    const queryClient = useQueryClient();

    let columns = '';
    const [controller, dispatch] = useMaterialUIController();
    const [currentColumn, setCurrentColumn] = useState(visibleColumn);
    const [colPref, setColPref] = useState([...columnPreference?.columns]);
    const [columnPreferenceChanged, setColumnPreferenceChanged] =
        useState(columnPreference);
    const [status, setStatus] = useState('idle')
    const {
        openConfigurator,
        miniSidenav,
        fixedNavbar,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
    } = controller;
    const [disabled, setDisabled] = useState(false);
    const [visibleColumnsOnTable, setVisibleColumnsOnTable] = useState([]);
    const sidenavColors = [
        'primary',
        'dark',
        'info',
        'success',
        'warning',
        'error',
    ];

    const [selectedValue, setSelectedValue] = useState([]);

    // Use the useEffect hook to change the button state for the sidenav type based on window size.
    useEffect(() => {
        // A function that sets the disabled state of the buttons for the sidenav type.
        function handleDisabled() {
            return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
        }

        // The event listener that's calling the handleDisabled function when resizing the window.
        window.addEventListener('resize', handleDisabled);

        // Call the handleDisabled function to set the state with the initial value.
        handleDisabled();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleDisabled);
    }, []);

    console.log(status, 'status')


    const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
    const handleTransparentSidenav = () => {
        setTransparentSidenav(dispatch, true);
        setWhiteSidenav(dispatch, false);
    };
    const handleWhiteSidenav = () => {
        setWhiteSidenav(dispatch, true);
        setTransparentSidenav(dispatch, false);
    };
    const handleDarkSidenav = () => {
        setWhiteSidenav(dispatch, false);
        setTransparentSidenav(dispatch, false);
    };
    const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
    const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
    const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

    // sidenav type buttons styles
    const sidenavTypeButtonsStyles = ({
        functions: { pxToRem },
        palette: { white, dark, background },
        borders: { borderWidth },
    }) => ({
        height: pxToRem(39),
        background: darkMode ? background.sidenav : white.main,
        color: darkMode ? white.main : dark.main,
        border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

        '&:hover, &:focus, &:focus:not(:hover)': {
            background: darkMode ? background.sidenav : white.main,
            color: darkMode ? white.main : dark.main,
            border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
        },
    });

    // sidenav type active button styles
    const sidenavTypeActiveButtonStyles = ({
        functions: { pxToRem, linearGradient },
        palette: { white, gradients, background },
    }) => ({
        height: pxToRem(39),
        background: darkMode
            ? white.main
            : linearGradient(gradients.dark.main, gradients.dark.state),
        color: darkMode ? background.sidenav : white.main,

        '&:hover, &:focus, &:focus:not(:hover)': {
            background: darkMode
                ? white.main
                : linearGradient(gradients.dark.main, gradients.dark.state),
            color: darkMode ? background.sidenav : white.main,
        },
    });


    const handleSelectOption = (e, value, oldValue) => {
        let result = colPref?.map((column) => {
            if (column.name === oldValue.name) {
                return {
                    ...column,
                    isVisible: !column.isVisible,
                    index: value.index
                };
            } else if (column.name === value.name) {
                return {
                    ...column,
                    isVisible: !column.isVisible,
                    index: oldValue.index
                };
            }
            return column;
        });
        setColPref(result);

    };

    const handleDeleteColumn = (e, deleteValue) => {
        let result = colPref?.map((column) => {
            if (column.name === deleteValue.name) {
                return {
                    ...column,
                    isVisible: !column.isVisible,
                };
            }
            return column;
        });

        // result = result?.filter(item => item.name!== deleteValue.name)
        setColPref(result);
    };


    const handleAddColumn = () => {
        const lastVisible = colPref.find(item => !item.isVisible);
        let result= colPref?.map((column)=>{
          if(column.name===lastVisible.name){
           return{
            ...column,
            isVisible:!column.isVisible,
           }
          }
          return column
        })
        console.log("result",result)
        setColPref(result)
    }



    const handleSubmit = () => {
        setStatus('pending')
        setColumnsFields(prev => ({ ...prev, columns: colPref }));
        changeAdminColumnVisibility({ columns: colPref }).then(data => {
            setColPref(data.data.data.columns)
            setColumnsFields(prev => ({ ...prev, columns: data.data.data.columns }))
            setStatus('success')
        }).catch(err => {
            console.log(err)
            setStatus('rejected')
        })
    }

    const onDiscard = () => {
        setColPref(columnPreference?.columns)
    }


    return (
        <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
            <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="baseline"
                pt={4}
                pb={2}
                px={1}
            >
                <MDBox>
                    <MDTypography variant="h5" pl={4}>
                        Edit your dashboard
                    </MDTypography>
                </MDBox>

                <Icon
                    sx={({ typography: { size }, palette: { dark, white } }) => ({
                        fontSize: `${size.lg} !important`,
                        color: darkMode ? white.main : dark.main,
                        stroke: 'currentColor',
                        strokeWidth: '2px',
                        cursor: 'pointer',
                        transform: 'translateY(5px)',
                    })}
                    onClick={handleCloseConfigurator}
                >
                    close
                </Icon>
            </MDBox>

            <MDBox pt={0.5} pb={3} px={1}>
                {colPref?.filter(item => item.isVisible).sort((a, b) => a.index - b.index)?.map((column, i) => {
                    return (
                        <MDBox mb={0.7} width="100%" key={`${column}_${i}`}>
                            <MDTypography variant="h6" ml={4.2}>{`Column ${i + 1
                                }`}</MDTypography>

                            <MDBox
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'center',
                                    gap: 1,

                                }}
                            >
                                <MDBox sx={{ width: '10%' }}>
                                    <DragIndicatorIcon />
                                </MDBox>
                                <MDBox sx={{ width: '80%' }}>
                                    <Autocomplete
                                        disableClearable
                                        sx={{ width: '100%' }}
                                        value={colPref[columnPreference?.columns.find(i => column.name === i.name).index]}
                                        defaultValue={columnPreference?.columns[colPref.find(i => (column.name === i.name)).index]}
                                        options={colPref?.filter(i => !i.isVisible)}
                                        getOptionLabel={(option) => option?.name}
                                        onChange={(event, value) => {
                                            handleSelectOption(event, value, column);

                                        }}
                                        renderInput={(params) => (
                                             <MDInput {...params} sx={{ width: '100%' }} />
                                        )}
                                    />
                                </MDBox>
                                <MDBox
                                    sx={{ width: '10%' }}
                                    onClick={(e) => handleDeleteColumn(e, column)}
                                >
                                    <DeleteIcon />
                                </MDBox>
                            </MDBox>

                        </MDBox>
                    );
                })}
                <MDBox
                    sx={{
                        display: 'flex',
                        mt: 2,
                        mr: 1,
                        flexDirection: 'column',
                    }}
                >
                    <button onClick={handleAddColumn}>Add new column</button>
                    <MDButton
                        variant="gradient"

                        color="dark"
                        sx={{ height: '10px', mt: 3.5, background: 'black' }}
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </MDButton>

                    <MDButton
                        variant="gradient"
                        onClick={onDiscard}
                        color="dark"
                        sx={{ height: '10px', mt: 3.5, background: 'black' }}
                    >
                        Discard
                    </MDButton>
                </MDBox>
            </MDBox>
        </ConfiguratorRoot>
    );
}

export default Configurator;