const AdoptionRequest = require('../models/adoptionRequest.model');

exports.updateRequestStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['approved', 'rejected'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status. Allowed: approved, rejected' });
  }

  try {
    const request = await AdoptionRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Adoption request not found' });

    request.status = status;
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
