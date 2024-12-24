const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu');


router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

router.get('/', async (req, res) => {
    try {
        // Use the correctly defined and imported model
        const data = await Menu.find();
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching menu data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:taste', async (req, res) => {
    try {
        // Use the correctly defined and imported model
        // const data = await Menu.find();
        // res.status(200).json(data);
    } catch (err) {
        // console.error('Error fetching menu data:', err);
        // res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const menuId = req.params.id; // Correct variable name casing
        const updateMenuData = req.body; // Correct variable name casing

        // Use correct variable names and handle potential errors properly
        const response = await Menu.findByIdAndUpdate(menuId, updateMenuData, {
            new: true, // Return the updated document
            runValidators: true // Run mongoose validation
        });

        if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }

        console.log('Data updated');
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;

        // `findByIdAndDelete` does not take `deleteMenuData` or any options
        const response = await Menu.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: 'Menu not found' });
        }

        console.log('Data deleted successfully');
        res.status(200).json({ message: 'Menu deleted successfully', data: response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// router.delete('/:id', async (req, res) => {
//     try {
//         const menuId = req.params.id
//         const response = await Menu.findByIdAndDelete(menuId,deleteMenuData, {
//             new: true,    // return the updated document
//             runValidators: true   // run mongoose validation
//         })
//         if (!response) {
//             return res.status(404).json({ error: 'menu not found' });
//         }
//         console.log('data delete succesfuly');
//         res.status(200).json(response);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'internal server error' });

//     }
// })

module.exports = router;