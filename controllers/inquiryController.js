import Inquiry from "../models/inquiry.js";
import { isUserAdmin, isUserCustomer, isUserNull } from "../models/user.js";

export async function addInquiry(req, res) {
    try {
        if (isUserNull(req)) {
            return res.status(401).json({ message: "Login first to perform this task" });
        }

        if (!isUserCustomer(req)) {
            return res.status(403).json({ message: "Only customers can add inquiries" });
        }

        const inquiryData = req.body;

        // Auto increment ID
        let id = 1;
        const inquiries = await Inquiry.find().sort({ id: -1 }).limit(1);
        if (inquiries.length > 0) {
            id = inquiries[0].id + 1;
        }

        inquiryData.id = id;
        inquiryData.email = req.user.email;
        inquiryData.phone = req.user.phone;
        inquiryData.response = "";

        const inquiry = new Inquiry(inquiryData);

        console.log(inquiryData);

        await inquiry.save();

        res.json({ message: "Inquiry added successfully ✅" });
    } catch (e) {
        res.status(500).json({ message: "Inquiry couldn't be added. Error: " + e });
    }
}

export async function getInquiry(req, res) {
    try {
        if (isUserNull(req)) {
            return res.status(401).json({ message: "Login first to perform this task" });
        }

        if (isUserAdmin(req)) {
            const inquiries = await Inquiry.find();
            return res.json(inquiries);
        }

        if (isUserCustomer(req)) {
            const inquiries = await Inquiry.find({
                email: req.user.email
            });
            return res.json(inquiries);
        }

        res.status(403).json({
            message: "Unauthorized access"
        });
    } catch (e) {
        res.status(500).json({ message: "Error fetching inquiries: " + e });
    }
}


export async function deleteInquiry(req, res) {
    try {
        if (isUserNull(req)) {
            return res.status(401).json({ message: "Login first to perform this task" });
        }
        const deleteId = req.params.id;


        if (isUserAdmin(req)) {

            await Inquiry.deleteOne({
                id: deleteId
            });
            res.json({ message: "Inquiry deleted successfully ✅" });
            return;
        }

        if (isUserCustomer(req)) {

            const inquiry = await Inquiry.findOne({
                id: deleteId
            });

            if (inquiry == null) {
                res.json({ message: "Inquiry is not found" });
                return;
            }

            if (inquiry.email == req.user.email) {
                await Inquiry.deleteOne({
                    id: deleteId
                });
                res.json({ message: "Inquiry deleted successfully ✅" });
                return;
            } else {
                res.status(403).json({
                    message: "Unauthorized access"
                });
                return;
            }


        }

        res.status(403).json({
            message: "Unauthorized access"
        });
    } catch (e) {
        res.status(500).json(
            { message: "Error delete inquiries: " + e }
        );
    }
}