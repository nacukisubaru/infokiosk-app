import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    openSelectLocation, 
    closeSelectLocation, 
    setSelectData, 
    openSelectGroup, 
    closeSelectGroup, 
    setValueSelectLocation, 
    setValueSelectGroup, 
    setActiveOptionLocation, 
    setActiveOptionGroup, 
    setOpenKeyboard, 
    setInputKeyboard, 
    setOpenKeyboardNumber, 
    setInputKeyboardNumber, 
    setInputNumberValueChildren,
    setDisabledBtnMinusChild,
    setDisabledBtnPlusChild,
    setCloseKeyboardNumber,
    setCloseKeyboard,
    setLayoutKeyboard
} from '../redux/actions';

import { Container, Typography, Grid, Box, Stack, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Filter from '../components/Filters/Filter';
import CardItem from '../components/Mainpage/CardItem';
import CardSmall from '../components/ListExcursions/CardSmall';
import TabsCard from '../components/TabsCard';
import InputPhone from '../components/InputPhone';
import CheckboxPolicy from '../components/CheckboxPolicy';
import SelectCustom from '../components/SelectCustom';
import InputCustom from '../components/InputCustom';
import Header from '../components/Header';
import InputNum from '../components/InputNumber';
import FancyBox from "../components/Images/FancyBox/FancyBox";
import MapYandex from '../components/MapYandex';

import img from '../assets/images/item.jpg';
import img2 from '../assets/images/item2.jpg';
import fancyBoxMainImg from "../assets/images/fancyBox/main.jpg";
import fancyBoxAddImg1 from "../assets/images/fancyBox/add1.jpg";
import fancyBoxAddImg2 from "../assets/images/fancyBox/add2.jpg";
import fancyBoxAddImg3 from "../assets/images/fancyBox/add3.jpg";
import fancyBoxAddImg4 from "../assets/images/fancyBox/add4.jpg";
import fancyBoxAddImg5 from "../assets/images/fancyBox/add5.jpg";
import fancyBoxAddImg6 from "../assets/images/fancyBox/add6.png";
import fancyBoxAddImg7 from "../assets/images/fancyBox/add7.png";
import SmsCodeInput from '../components/SmsCodeInput';
import InputDate from '../components/InputDate';

export const useStyles = makeStyles((theme) => ({
  item: {
    "&:nth-child(even) .MuiPaper-root": {
      borderBottomRightRadius: "50px",
    },
    "&:nth-child(odd) .MuiPaper-root": {
      borderTopLeftRadius: "50px",
    },
  },
  itemSm: {
    "&:nth-child(even) .MuiPaper-root > a": {
      borderBottomRightRadius: "50px",
    },
    "&:nth-child(odd) .MuiPaper-root > a": {
      borderTopLeftRadius: "50px",
    },
  },
}));

export default function UIKitPage() {
    const keyboardRef = useRef();
    const dispatch = useDispatch();
    const classes = useStyles();

    /*SelectLocation*/
    // const openLocation = useSelector(state => state.select.openSelectLocation);
    // const popupDataLocation = useSelector(state => state.select.popupDataLocation.body);
    // const handleOpenLocation = () => {
    //     dispatch(setSelectData(selectLoc.popupData));
    //     dispatch(openSelectLocation());
    // }    
    // const handleCloseLocation = () => dispatch(closeSelectLocation());
    // const handleOptionLocation = (id, value) => {
    //     dispatch(setActiveOptionLocation(id));
    //     dispatch(setValueSelectLocation(value));
    // }
    // const itemsActive = popupDataLocation.filter(item => item.active);
    // const valueLocation = itemsActive.map(item => item.option);
    // const selectLoc = {
    //     label: 'Выберите локацию',
    //     value: valueLocation.join(', '),
    //     placeholder: '',
    //     popupData: {
    //         title: 'Выберите локацию',
    //         body: popupDataLocation,  
    //         open: openLocation,
    //         handlerOpen: handleOpenLocation,
    //         handlerClose: handleCloseLocation,
    //         optionHandler: handleOptionLocation
    //     }
    // }

    /*SelectGroup*/
    const openGroup = useSelector(state => state.select.openSelectGroup);
    const valueGroup = useSelector(state => state.select.valueSelectGroup);    
    const popupDataGroup = useSelector(state => state.select.popupDataGroup.body);
    const handleOpenGroup = () => {
        dispatch(setSelectData(selectGroup.popupData));
        dispatch(openSelectGroup());
    }    
    const handleCloseGroup = () => dispatch(closeSelectGroup());
    const handleOptionGroup = (id, value) => {
        dispatch(setActiveOptionGroup(id));
        dispatch(closeSelectGroup());
        dispatch(setValueSelectGroup(value));
    }
    const selectGroup = {
        label: 'Группа*',
        value: valueGroup,
        placeholder: 'Выберите группу',
        popupData: {
            title: 'Выберите группу',
            body: popupDataGroup,  
            open: openGroup,
            handlerOpen: handleOpenGroup,
            handlerClose: handleCloseGroup,
            optionHandler: handleOptionGroup
        }
    }    

    /*keyboard*/
    const optionsInput = {
        name: "email",
        value: useSelector(state => state.keyboard.input),
        placeholder: "Введите адрес электронной почты",
        label: "Электронная почта*",
        onClick: () => dispatch(setOpenKeyboard()),
        keyboard: {
            keyboardRef: keyboardRef,
            layout: useSelector(state => state.keyboard.layout),
            input: useSelector(state => state.keyboard.input),
            open: useSelector(state => state.keyboard.openKeyboard),
            closeHandler: setCloseKeyboard,
            setInputValue: setInputKeyboard,
            setLayout: setLayoutKeyboard
        }
    }

    /*keyboardNumber*/
    const optionsNumber = {
        name: "phone",
        value: useSelector(state => state.keyboard.inputNumber),
        placeholder: "+7 (___) __ __ ___",
        label: "Номер телефона*",
        onClick: () => dispatch(setOpenKeyboardNumber()),
        keyboard: {
            input: useSelector(state => state.keyboard.inputNumber),
            open: useSelector(state => state.keyboard.openKeyboardNumber),
            closeHandler: setCloseKeyboardNumber,
            setInputValue: setInputKeyboardNumber
        }
    }

    /*input date*/
    // const handleDateChange = (event) => {};
    // const optionsDate = {
    //     label: true,
    //     onChange: handleDateChange
    // }

    /*input num*/
    const optionsNum = {
        label: 'Детей, от 3 до 7 лет',
        min: 0,
        value: useSelector(state => state.inputNumber.valueChildren),
        setValue: setInputNumberValueChildren,
        setDisabledMinus: setDisabledBtnMinusChild,
        setDisabledPlus: setDisabledBtnPlusChild,
        disabledBtnMinus: useSelector(state => state.inputNumber.disabledBtnMinusChildren),
        disabledBtnPlus: useSelector(state => state.inputNumber.disabledBtnPlusChildren),
    }
    
    /*card item*/
    const item = {
        img: img,
        text: 'Ферма Экзархо - место Вашей силы Ферма Экзархо - место Вашей силы',
        theme: '',
        url: '/excursion',
    };

    const itemSmall = {
        id: 1,
        img: img2,
        imgText: 'Групповая',
        tags: [
            'Вт, Чт, Сб, Вс',
            '12 часов'
        ],
        title: 'Золотое кольцо Абхазии',
        description: 'Золотое кольцо Абхазии- это однодневный обзорный тур, который произведет на вас неизгладимое впечатление. Абхазия — страна ...',
        price: '5 500 ₽',
        promo: true
    };

    /*map*/
    const map = {
        filter: true,
        objectPoints: true,
        placesPoints: true,
        balloonBtn: false
    }

    /*fancybox*/
    const excursionParams = {
        excursionTitle: "Групповая",
        excursionInfo: {
          days: "Вт, Чт, Сб, Вс",
          length: "12 часов",
          seats: "5-15 мест",
        },
        fancyBoxImages: [
          fancyBoxMainImg,
          fancyBoxAddImg1,
          fancyBoxAddImg2,
          fancyBoxAddImg3,
          fancyBoxAddImg4,
          fancyBoxAddImg5,
          fancyBoxAddImg6,
          fancyBoxAddImg7,
        ],
    };

    const styleRadio = {
        label: {
            fontSize: 24,
            position: 'relative',
            '&::before': {
                content: '',
                display: 'block',
                width: 25,
                height: 25,
                borderRadius: 50,
                border: '3px solid #B9B9B9',
                position: 'absolute'
            }
        },
        input: {
            width: 0,
            height: 0,
            position: 'absolute',
            zIndex: -1,
            opacity: 0,
            // 'input:checked + .checkbox': {
            //     borderColor: '#7348FF'
            // }
        },
        checkbox: {
            display: 'block',
            width: 25,
            height: 25,
            borderRadius: 50,
            border: '3px solid #B9B9B9'
        }
    }

    const onFilterClick = (e) => { console.log(123) }
    
    return (
        <main>
            <Container maxWidth="md" sx={{paddingTop: '35px', paddingBottom: '35px'}}>

                <div style={{marginBottom: '85px'}}>
                    <Typography variant="h2" mb={4}>Типографика</Typography>

                    <Grid container mb={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <Typography variant="h1" component="div">Заголовок H1</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="h1" component="div">Начни свой Visit Sochi</Typography>
                        </Grid>
                    </Grid>

                    <Grid container mb={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <Typography variant="h2">Заголовок H2</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="h2">Ферма Экзархо - место вашей силы</Typography>
                        </Grid>
                    </Grid>

                    <Grid container mb={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <Typography variant="h3">Заголовок H3</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="h3">экскурсии</Typography>
                        </Grid>
                    </Grid>

                    <Grid container mb={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <Typography variant="h4">Заголовок H4</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="h4">Выберите дату посещения</Typography>
                        </Grid>
                    </Grid>

                    <Grid container mb={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <Typography variant="h5">Заголовок H5</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="h5">смотреть события ещё</Typography>
                        </Grid>
                    </Grid>

                    <Grid container mb={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <Typography variant="h6">Заголовок H6</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="h6">К сожалению в выбранной категории нет подходящих экскурсий по указанным параметрам</Typography>
                        </Grid>
                    </Grid>

                    <Grid container mb={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <Typography variant="h7">Заголовок H7</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="h7">Золотое кольцо Абхазии</Typography>
                        </Grid>
                    </Grid>

                    <Grid container mb={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <Typography variant="body1">Body 1 Основной текст</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="body1">Skypark находится в уникальной природной локации – Ахштырском ущелье Сочинского национального парка. Здесь вы прогуляетесь по самому длинному в России подвесному пешеходному мосту, который входит в топ-13 самых впечатляющих мостов мира по версии CNN, полетаете на самых высоких в мире качелях, сможете прыгнуть с самой высокой в России банджи-площадки, прокатиться на суперскоростном троллее и посмотреть на мир с высоты птичьего полёта, летая на Zipline.</Typography>
                        </Grid>
                    </Grid>

                    <Grid container mb={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <Typography variant="body2">Body 2 Дополнительный текст</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="body2">Увлекательный подъем в горы Красной поляны и Роза хутор. Тут вы увидите знаменитые трассы и сам горнолыжный курорт России  мирового класса и уровня обсуживания и сервиса ...</Typography>
                        </Grid>
                    </Grid>

                    <Grid container mb={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <Typography variant="button">Button 1 medium</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="button">Забронировать</Typography>
                        </Grid>
                    </Grid>

                    <Grid container mb={4} justifyContent="space-between">
                        <Grid item xs={5}>
                            <Typography variant="subtitle1">Subtitles 1</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant="subtitle1">12-15 мест</Typography>
                        </Grid>
                    </Grid>
                </div>

                <div style={{marginBottom: '85px'}}>
                    <Typography variant="h2" mb={4}>Кнопки</Typography>

                    <Stack spacing={3} direction="row" mb={6}>
                        <Button variant="contained"><Typography variant="button2">Открыть фильтр</Typography></Button>
                        <Button variant="contained" disabled><Typography variant="button2">Открыть фильтр</Typography></Button>
                    </Stack>     

                    <Stack spacing={3} direction="row">                        
                        <Button variant="outlined"><Typography variant="button2">НАЗАД К СПИСКУ</Typography></Button>
                        <Button variant="outlined" disabled><Typography variant="button2">ПРИМЕНИТЬ</Typography></Button>
                    </Stack>                
                </div>

                <div style={{marginBottom: '85px'}}>
                    <Typography variant="h2" mb={4}>Элементы формы</Typography>

                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"                        
                        >
                            <Stack 
                                spacing={5} 
                                direction="row" 
                                justifyContent="space-between"
                                alignItems="center" 
                                mb={10}
                            >
                                {/* <InputDate options={ optionsDate } />                                  */}
                                <InputNum options={ optionsNum } /> 
                                <InputPhone options={ optionsNumber } />   
                            </Stack>

                            <Stack 
                                spacing={5} 
                                direction="row" 
                                justifyContent="space-between"
                                alignItems="center" 
                                mb={10}
                            >
                                {/* <SelectCustom data={ selectLoc } /> */}
                                <SelectCustom data={ selectGroup } />
                                <InputCustom options={ optionsInput } />
                            </Stack>                                               

                            <CheckboxPolicy />

                            <Stack 
                                spacing={5} 
                                direction="row" 
                                justifyContent="flex-start"
                                alignItems="center" 
                            >
                                <Stack 
                                    spacing={5} 
                                    direction="row" 
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    className="radio-button"
                                >                                    
                                    <input id="all" type="radio" value="all" name="points" onClick={ (e) => onFilterClick(e) }  className="radio-button__input" defaultChecked />
                                    <label htmlFor="all" className="radio-button__label">Все точки</label>                                    
                                </Stack>
                                <Stack
                                    spacing={5} 
                                    direction="row" 
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <input id="points" type="radio" value="points" name="points" onClick={ (e) => onFilterClick(e) } className="radio-button__input" />
                                    <label htmlFor="points" className="radio-button__label">Места сбора</label>
                                </Stack>
                                <Stack
                                    spacing={5} 
                                    direction="row" 
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <input id="objects" type="radio" value="objects" name="points" onClick={ (e) => onFilterClick(e) } className="radio-button__input" />
                                    <label htmlFor="objects" className="radio-button__label">Объекты посещения</label>
                                </Stack>
                            </Stack>

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                defaultValue="all"                            
                            >
                                <FormControlLabel value="all" control={<Radio />} label="Все точки" className={ classes.mapFilterItem } />
                                <FormControlLabel value="points" control={<Radio />} label="Места сбора" className={ classes.mapFilterItem } />
                                <FormControlLabel value="objects" control={<Radio />} label="Объекты посещения" className={ classes.mapFilterItem } />
                            </RadioGroup> 
                    </Box>
                </div>

                <div style={{marginBottom: '85px'}}>
                    <Typography variant="h2" mb={4}>Табы</Typography>

                    <TabsCard options={{
                        tabs: ['Item one', 'Item two', 'Item three'],
                        panels: ['Item', 'Item', 'Item']
                    }} />                    
                </div>

                <div style={{marginBottom: '85px'}}>
                    <Typography variant="h2" mb={4}>Карточки</Typography>

                    <Grid container justifyContent="flex-start" spacing={3}>
                        <Grid item xs={3} className={ classes.item }>
                            <CardItem data={ item } />
                        </Grid>
                        <Grid item xs={3} className={ classes.item }>
                            <CardItem data={ item } />
                        </Grid>
                        <Grid item xs={3} className={ classes.item }>
                            <CardItem data={ item } />
                        </Grid>
                        <Grid item xs={3} className={ classes.item }>
                            <CardItem data={ item } />
                        </Grid>
                    </Grid>   
                </div>

                <div style={{marginBottom: '85px'}}>
                    <Grid container justifyContent="flex-start" spacing={3}>
                        <Grid item xs={3} className={ classes.itemSm }>
                            <CardSmall data={ itemSmall } />
                        </Grid>
                        <Grid item xs={3} className={ classes.itemSm }>
                            <CardSmall data={ itemSmall } />
                        </Grid>
                        <Grid item xs={3} className={ classes.itemSm }>
                            <CardSmall data={ itemSmall } />
                        </Grid>
                        <Grid item xs={3} className={ classes.itemSm }>
                            <CardSmall data={ itemSmall } />
                        </Grid>
                    </Grid>
                </div>

                <div style={{marginBottom: '85px'}}>
                    <Typography variant="h2" mb={4}>Клавиатуры</Typography>

                    <div style={{marginBottom: '25px'}}>
                        <Stack 
                            spacing={5} 
                            direction="row" 
                            justifyContent="space-between"
                            alignItems="center" 
                            mb={10}
                        >
                            <InputCustom options={ optionsInput } />
                            <InputPhone options={ optionsNumber } />
                        </Stack>
                    </div>                     
                </div> 

                <div style={{marginBottom: '85px'}}>
                    <Typography variant="h2" mb={4}>Фильтры</Typography>                    

                    <div style={{position: 'relative', height: '135px'}}>
                        {/* <Filter /> */}
                    </div>                    
                </div>                    

                <div style={{marginBottom: '85px'}}>
                    <Typography variant="h2" mb={4}>Карта</Typography> 
                    <MapYandex data={ map } />
                </div>

                <div style={{ marginBottom: "85px" }}>
                    <Typography variant="h2" mb={4}>
                        Fancy Box
                    </Typography>
                    <FancyBox
                        images={excursionParams.fancyBoxImages}
                        excursionTitle={excursionParams.excursionTitle}
                        excursionInfo={excursionParams.excursionInfo}
                    />
                </div>

                <div>
                    <Typography variant="h2" mb={4}>Инпут для ввода смс кода</Typography>
                    <SmsCodeInput />
                </div>
            </Container>

            <div style={{marginBottom: '85px'}}>
                {/* <Header /> */}
            </div>
    </main>
  );
}
