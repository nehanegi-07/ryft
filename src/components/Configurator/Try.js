import { useState, useEffect,useCallback,useRef } from 'react';
import Icon from '@mui/material/Icon';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import { Autocomplete } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import update from 'immutability-helper';
import { useDrag, useDrop } from 'react-dnd'
import { changeAdminColumnVisibility } from 'services/Admin.Services';

const Try=({id,columnPreference,colPref,handleSelectOption,handleDeleteColumn,column,value,defaultValue,index,options,setColPref})=>{
    
    const ref = useRef(null)

    const restructureDataForResult = (data) => {
      let result = new Map();
      for (let i = 0; i < data.length; i++) {
        result.set(i, data[i].index);
      }
      return result;
    };
  
    const reorder = (selectedItem, index) => {
      const mapData = restructureDataForResult(colPref);
      const dragRecord = colPref[selectedItem.index];
      const rre = update(colPref, {
        $splice: [
          [selectedItem.index, 1],
          [index, 0, dragRecord]
        ]
      });
  
      const updatedColumn = rre.map((item, index) => {
        return {
          name: item.name,
          isVisible: item.isVisible,
          index: mapData.get(index)
        }
      })
  
      //const dragRecord = newColumnData[selectedItem.index];
      // const rre = update(newColumnData, {
      //   $splice: [
      //     [selectedItem.index, 1],
      //     [index, 0, dragRecord],
      //   ],
      // });
  
      // const updatedColumn = rre.map((item, index) => {
      //   return {
      //     name: item.name,
      //     isVisible: item.isVisible,
      //     index: mapData.get(index),
      //   };
      // });
  
      const finalResult = colPref.map((item) => {
        if (!item.isVisible) {
          return item;
        } else {
          const column = updatedColumn.find((i) => i.name === item.name);
          return column;
        }
      });
      return finalResult;
    };
  
    const [, drop] = useDrop({
      accept: "card",
      drop: (item) => {
        const result = reorder(item, index);
        setColPref(result)
        changeAdminColumnVisibility({columns:result})
      },
    })
  
    const [{ isDragging }, drag] = useDrag({
      type: "card",
      item: () => {
        console.log(id, index, column, 'dragging')
        return {
          id,
          index,
          value: column,
        };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return(
        <MDBox
        ref={ref}
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
                value={value}
                defaultValue={defaultValue}
                options={options}
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

    )
}

export default Try