  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
           

            {/* {isUser && (
              <>
                <IconButton onClick={(e) => setMoreMenuAnchor(e.currentTarget)} sx={{ color: '#FB404B', bgcolor: 'rgba(251,64,75,0.14)', borderRadius: '18px', p: 1.6 }}>
                  <MoreVertIcon fontSize="large" />
                </IconButton>
                <Menu anchorEl={moreMenuAnchor} open={Boolean(moreMenuAnchor)} onClose={() => setMoreMenuAnchor(null)}
                  PaperProps={{ sx: { mt: 2.5, borderRadius: '24px', boxShadow: 20, minWidth: 280 } }}>
                  <MenuItem onClick={() => { navigate('/entryform'); setMoreMenuAnchor(null); }} sx={{ py: 3.2, fontWeight: 600, fontSize: 17, color: '#0040B9' }}>Entry Form</MenuItem>
                  <MenuItem onClick={() => { navigate('/feedback'); setMoreMenuAnchor(null); }} sx={{ py: 3.2, fontWeight: 600, fontSize: 17, color: '#6C0204' }}>Feedback Form</MenuItem>
                </Menu>
              </>
            )} */}


            {isUser && (
  <>
    {/* Desktop वर डायरेक्ट बटन्स – मोबाईलवर हाइड होतात */}
    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, alignItems: 'center' }}>
      {/* <Button
        variant="outlined"
        size="medium"
        onClick={() => navigate('/entryform')}
        sx={{
          bgcolor: '#0040B9',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: 3,
          px: 3,
          boxShadow: 6,
          '&:hover': { bgcolor: '#002D80' }
        }}
      >
        Entry Form
      </Button> */}

      <Button
        variant="outlined"
        size="medium"
          onClick={() => navigate('/entryform')}
        sx={{
          borderColor: '#0040B9',
          color: '#0040B9',
          fontWeight: 'bold',
          borderRadius: 3,
          px: 3,
          borderWidth: 2,
          '&:hover': { borderColor: '#002D80', bgcolor: 'rgba(0,64,185,0.08)' }
        }}
      >
       Entry Form
      </Button>

      <Button
        variant="outlined"
        size="medium"
        onClick={() => navigate('/feedback')}
        sx={{
          borderColor: '#0040B9',
          color: '#0040B9',
          fontWeight: 'bold',
          borderRadius: 3,
          px: 3,
          borderWidth: 2,
          '&:hover': { borderColor: '#002D80', bgcolor: 'rgba(0,64,185,0.08)' }
        }}
      >
        Feedback Form
      </Button>


       <Typography sx={{ color: '#FB404B', fontWeight: 'bold', fontSize: { xs: 19, sm: 19 }, textTransform: 'uppercase', letterSpacing: '1.8px' }}>
              {user?.username || 'ADMIN'}
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ bgcolor: '#FB404B', width: 3.5, height: 20 }} />
            <IconButton onClick={handleLogout} sx={{ color: '#FB404B' }}>
              <PowerSettingsNewIcon fontSize="medium" />
            </IconButton>
    </Box>

    {/* 3-dots मेनू – सर्व डिव्हाइसेसवर दिसेल (मोबाईलवर मुख्य पर्याय) */}
    {/* <>
      <IconButton
        onClick={(e) => setMoreMenuAnchor(e.currentTarget)}
        sx={{
          color: '#FB404B',
          bgcolor: 'rgba(251,64,75,0.14)',
          borderRadius: '18px',
          p: 1.6
        }}
      >
        <MoreVertIcon fontSize="large" />
      </IconButton>

      <Menu
        anchorEl={moreMenuAnchor}
        open={Boolean(moreMenuAnchor)}
        onClose={() => setMoreMenuAnchor(null)}
        PaperProps={{
          sx: { mt: 2.5, borderRadius: '24px', boxShadow: 20, minWidth: 280 }
        }}
      >
        <MenuItem
          onClick={() => { navigate('/entryform'); setMoreMenuAnchor(null); }}
          sx={{ py: 3.2, fontWeight: 600, fontSize: 17, color: '#0040B9' }}
        >
          Entry Form
        </MenuItem>
        <MenuItem
          onClick={() => { navigate('/feedback'); setMoreMenuAnchor(null); }}
          sx={{ py: 3.2, fontWeight: 600, fontSize: 17, color: '#6C0204' }}
        >
          Feedback Form
        </MenuItem>
      </Menu>
    </> */}
  </>
)}
          </Box>